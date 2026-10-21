# ---------------------------------------------------------------------------
# LA MANO DE LA PORTADA, HECHA EN BLENDER
#
# La primera mano se construía con cápsulas sueltas en Three (un cilindro por
# falange) y se veía mal: los dedos eran tubos separados, sin carne entre
# ellos, y las articulaciones eran bolas. De frente y a contraluz se leía como
# un maniquí, no como una mano.
#
# Aquí se hace de otra forma. Se dibuja solo el ESQUELETO —una línea de
# vértices por dedo, como un palillo— y el modificador Skin le pone carne
# alrededor con el grosor que lleve cada vértice. Como el esqueleto está
# conectado (muñeca → palma → nudillos → dedos), la carne también sale
# conectada: hay palma de verdad entre los dedos y las articulaciones son
# continuas. Encima, Subdivision lo suaviza.
#
# Es el camino corto clásico para una mano orgánica, y para una silueta a
# contraluz —que es todo lo que se ve de ella en la portada— sobra.
#
# CÓMO SE EJECUTA (no hace falta abrir Blender):
#   blender --background --python herramientas/mano-blender.py
#
# QUÉ DEJA:
#   public/modelos/mano.glb   el modelo que carga la portada
#   y, con --render, un PNG de prueba para mirarlo sin navegador.
#
# ORIENTACIÓN. Se modela con los dedos hacia el +Z de Blender y la palma
# mirando al -Y. El exportador de glTF convierte Z-arriba a Y-arriba, así que
# en Three los dedos salen hacia arriba (+Y) y la palma mirando a la cámara
# (+Z), que es lo que espera components/deeptech/movil.tsx.
# ---------------------------------------------------------------------------
import math
import os
import sys

import bpy
import bmesh
from mathutils import Vector

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "public", "modelos", "mano.glb")
PREVIA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mano-previa.png")


def limpiar():
    """Blender arranca con un cubo, una luz y una cámara. Fuera todo."""
    bpy.ops.wm.read_factory_settings(use_empty=True)


# --------------------------------------------------------------- esqueleto

# Cada dedo: dónde nace en la línea de nudillos (x), cuánto mide, cuánto se
# cierra y qué grosor tiene. Son las medidas de una mano normal, no
# inventadas: el corazón es el más largo, el meñique el más corto y el más
# fino, y todos nacen a distinta altura (la línea de nudillos es un arco, no
# una recta) — eso último es la mitad de lo que hace que una mano parezca una
# mano.
DEDOS = [
    # nombre     x       y_nudillo  largos                  curva  grosor
    ("indice",   0.038,  0.004,     (0.040, 0.025, 0.020),  0.55,  0.0100),
    ("corazon",  0.013,  0.009,     (0.045, 0.029, 0.021),  0.64,  0.0104),
    ("anular",  -0.013,  0.006,     (0.042, 0.027, 0.020),  0.74,  0.0098),
    ("menique", -0.038, -0.003,     (0.032, 0.020, 0.018),  0.86,  0.0082),
]

# Cuánto se abre cada dedo hacia los lados, en radianes. Más abierto que en
# la primera prueba: con los dedos casi paralelos, la carne del modificador
# Skin los unía hasta cerca de las puntas y la mano salía como una manopla.
ABANICO = {"indice": -0.26, "corazon": -0.07, "anular": 0.15, "menique": 0.36}


def construir_esqueleto(bm):
    """Dibuja la mano como vértices y aristas, y devuelve el radio de cada uno."""
    radios = {}

    def nodo(pos, radio):
        v = bm.verts.new(pos)
        radios[v] = radio
        return v

    # La columna: muñeca → base de la palma → línea de nudillos.
    muneca = nodo((0.0, 0.0, -0.105), 0.0225)
    base = nodo((0.0, 0.002, -0.060), 0.0300)
    medio = nodo((0.0, 0.001, -0.026), 0.0360)
    # La línea de nudillos, MÁS BAJA y más gorda que los dedos. Es lo que
    # separa «palma ancha con dedos saliendo» de «cuatro tubos pegados»: si
    # este nodo está a la misma altura que los nudillos y con su mismo
    # grosor, la carne de todos se solapa y no hay separación hasta la punta.
    nudillos = nodo((0.0, 0.0, -0.014), 0.0275)
    bm.edges.new((muneca, base))
    bm.edges.new((base, medio))
    bm.edges.new((medio, nudillos))

    # El antebrazo, que se va hacia abajo y hacia atrás y sale del encuadre.
    brazo = nodo((0.0, 0.016, -0.200), 0.0250)
    bm.edges.new((muneca, brazo))

    for nombre, x, y_nudillo, largos, curva, grosor in DEDOS:
        # El nudillo de este dedo, separado de la columna de la palma.
        # Grosor del nudillo POR DEBAJO del del dedo, no por encima: engordar
        # aquí es lo que pegaba unos dedos con otros.
        n = nodo((x, y_nudillo, 0.019), grosor * 0.88)
        bm.edges.new((nudillos, n))

        anterior = n
        pos = Vector((x, y_nudillo, 0.019))
        for i, largo in enumerate(largos):
            # Cada falange se dobla un poco más que la anterior: es lo que
            # ahueca la mano. El giro va hacia -Y, o sea hacia la cámara.
            angulo = curva * (0.45 + i * 0.42)
            lateral = ABANICO[nombre] * (0.5 + i * 0.3)
            direccion = Vector((
                math.sin(lateral) * largo,
                -math.sin(angulo) * largo,
                math.cos(angulo) * largo,
            ))
            pos = pos + direccion
            # De la base a la punta el dedo adelgaza, y la yema se redondea.
            radio = grosor * (1.0 - 0.14 * (i + 1))
            v = nodo(pos.copy(), radio)
            bm.edges.new((anterior, v))
            anterior = v

    # EL PULGAR. Sale bajo, del canto del índice, y va hacia fuera y hacia la
    # cámara. Es el que decide si esto se lee como una mano: sin él, cuatro
    # dedos en fila son un rastrillo.
    # Sube y se cierra respecto a la primera prueba, donde salía casi en
    # horizontal y la mano parecía un saludo vulcano.
    pulgar_base = nodo((0.032, 0.002, -0.044), 0.0165)
    bm.edges.new((base, pulgar_base))
    pos = Vector((0.032, 0.002, -0.044))
    direcciones = [
        Vector((0.024, -0.016, 0.026)),
        Vector((0.015, -0.019, 0.024)),
        Vector((0.006, -0.015, 0.018)),
    ]
    anterior = pulgar_base
    for i, d in enumerate(direcciones):
        pos = pos + d
        v = nodo(pos.copy(), 0.0135 * (1.0 - 0.14 * i))
        bm.edges.new((anterior, v))
        anterior = v

    return radios


def construir_mano():
    malla = bpy.data.meshes.new("mano")
    objeto = bpy.data.objects.new("Mano", malla)
    bpy.context.collection.objects.link(objeto)

    bm = bmesh.new()
    radios = construir_esqueleto(bm)
    # El orden de los vértices en la malla no es el de creación: hay que
    # apuntar el radio antes de volcar y leerlo por índice después.
    bm.verts.index_update()
    por_indice = {v.index: r for v, r in radios.items()}
    bm.to_mesh(malla)
    bm.free()

    # Skin: pone carne alrededor de las aristas, con el grosor de cada vértice.
    objeto.modifiers.new(name="Skin", type="SKIN")
    capa = malla.skin_vertices[0].data
    for i, radio in por_indice.items():
        capa[i].radius = (radio, radio)
    # La muñeca es la raíz del árbol; sin raíz marcada, Skin no sabe por dónde
    # empezar a recorrer y el resultado sale del revés.
    capa[0].use_root = True

    suave = objeto.modifiers.new(name="Subdivision", type="SUBSURF")
    suave.levels = 2
    suave.render_levels = 2

    bpy.context.view_layer.objects.active = objeto
    for m in list(objeto.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)

    # APLASTARLA Y ENSANCHARLA. El modificador Skin solo sabe hacer tubos de
    # sección redonda, y una mano no es un manojo de tubos: la palma es una
    # losa ancha y plana y los dedos son ovalados, no cilíndricos. Sin esto la
    # mano sale con palma de huevo y se lee como un guante hinchado.
    #
    # Se hace al final, sobre la malla ya suavizada, y de una vez para toda la
    # mano: los dedos también agradecen aplastarse un poco.
    objeto.scale = (1.14, 0.72, 1.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    # Sombreado suave: sin esto se ven las caras del polígono en el borde, que
    # es justo donde la portada la ilumina.
    malla.shade_smooth()
    return objeto


def material_silueta(objeto):
    """Casi negro y mate. En la portada lo único que se le ve es el borde que
    recortan las luces; el color apenas importa, pero sin algo de tono no hay
    de dónde sacar ese borde."""
    mat = bpy.data.materials.new("Silueta")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.035, 0.047, 0.07, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.72
    bsdf.inputs["Metallic"].default_value = 0.05
    objeto.data.materials.append(mat)


def punto_apoyo(objeto):
    """Un vacío llamado «apoyo» que marca dónde se queda el móvil.

    Va en el modelo y no calculado en el navegador a propósito: si algún día
    se cambia la pose de la mano aquí, el móvil se recoloca solo. Calcularlo
    desde la caja que ocupa la malla parecía más simple y no lo es — basta
    con que un dedo se estire para que el móvil se mueva sin que nadie lo
    haya tocado.

    ALTO, NO EN EL CENTRO DE LA PALMA. La primera versión lo puso a la
    altura de la palma y el resultado era que el móvil tapaba la mano entera:
    solo asomaban cuatro yemas por arriba y el pulgar por un lado, y eso no
    se lee como una mano, se lee como manchas oscuras detrás del móvil.

    Puesto a esta altura, el móvil se apoya por su canto de abajo sobre los
    dedos y queda de pie: se ve el móvil entero Y la mano entera debajo, que
    es lo que hace la referencia."""
    vacio = bpy.data.objects.new("apoyo", None)
    vacio.empty_display_size = 0.02
    bpy.context.collection.objects.link(vacio)
    vacio.location = (0.0, -0.030, 0.118)
    return vacio


def exportar(objeto, apoyo):
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    objeto.select_set(True)
    apoyo.select_set(True)
    bpy.context.view_layer.objects.active = objeto
    bpy.ops.export_scene.gltf(
        filepath=SALIDA,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        # Sin cámaras, luces ni animaciones: la portada pone las suyas.
        export_cameras=False,
        export_lights=False,
        export_animations=False,
        # Draco reduce mucho, pero obliga a cargar su descompresor en el
        # navegador. Para una malla de este tamaño no compensa.
        export_draco_mesh_compression_enable=False,
    )
    return os.path.getsize(SALIDA)


def render_previa(objeto):
    """Una foto de la mano, parecida a como la ilumina la portada: oscura, con
    dos contraluces de color. Es la única forma de mirarla sin navegador."""
    escena = bpy.context.scene
    # En Blender 5 el motor rápido se vuelve a llamar BLENDER_EEVEE a secas.
    escena.render.engine = "BLENDER_EEVEE"
    escena.render.resolution_x = 900
    escena.render.resolution_y = 900
    escena.render.film_transparent = False
    escena.world = bpy.data.worlds.new("Mundo")
    escena.world.use_nodes = True
    escena.world.node_tree.nodes["Background"].inputs[0].default_value = (0.004, 0.006, 0.012, 1)

    camara_datos = bpy.data.cameras.new("Camara")
    camara_datos.lens = 70
    camara = bpy.data.objects.new("Camara", camara_datos)
    bpy.context.collection.objects.link(camara)
    camara.location = (0.0, -0.52, 0.02)
    camara.rotation_euler = (math.radians(90), 0, 0)
    escena.camera = camara

    def luz(nombre, color, energia, pos):
        d = bpy.data.lights.new(nombre, type="AREA")
        d.color = color
        d.energy = energia
        d.size = 0.6
        o = bpy.data.objects.new(nombre, d)
        bpy.context.collection.objects.link(o)
        o.location = pos
        direccion = Vector((0, 0, 0)) - Vector(pos)
        o.rotation_euler = direccion.to_track_quat("-Z", "Y").to_euler()

    luz("clave", (1, 1, 1), 35, (-0.35, -0.4, 0.5))
    luz("contra_cian", (0.22, 0.88, 1.0), 220, (0.5, 0.45, 0.1))
    luz("contra_menta", (0.17, 0.96, 0.69), 90, (-0.5, 0.35, -0.2))

    escena.render.filepath = PREVIA
    bpy.ops.render.render(write_still=True)


def main():
    limpiar()
    objeto = construir_mano()
    material_silueta(objeto)
    apoyo = punto_apoyo(objeto)
    tam = exportar(objeto, apoyo)
    print(f"[mano] exportada: {SALIDA} ({tam / 1024:.0f} KB)")
    print(f"[mano] vertices: {len(objeto.data.vertices)}  caras: {len(objeto.data.polygons)}")
    if "--render" in sys.argv:
        render_previa(objeto)
        print(f"[mano] previa: {PREVIA}")


main()
