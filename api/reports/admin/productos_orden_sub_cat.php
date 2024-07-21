<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/producto_data.php');

// Se instancian las entidades correspondientes.
$producto = new ProductoData;

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Productos Ordenados por Categoria y Subcategoría');
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->productosOrdenSubYCategoria()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(225);
    // Se establece la fuente para los encabezados.
    //setFont(Nombre de la fuente, Estilo, Tamaño)
    $pdf->setFont('Arial', 'B', 11);

    // Se imprimen las celdas con los encabezados.
    //cell(Ancho de la celda, Alto de la celda, Valor de la celda, Tendrá Borde o no, Salto de linea, Alineado del texto C: center, Relleno de la celda)
    $pdf->cell(50, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(70, 10, 'Descripción', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Precio (US$)', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los productos.
    //setFont(Nombre de la fuente, Estilo, Tamaño)
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataProductos as $rowProducto) {
        ($rowProducto['estado_producto']) ? $estado = 'Activo' : $estado = 'Inactivo';
        // Se imprimen las celdas con los datos de los productos.
        //cell(Ancho de la celda, Alto de la celda, Valor de la celda, Tendrá Borde o no, Salto de linea, Alineado del texto C: center, Relleno de la celda)
        $pdf->cell(50, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0);
        $pdf->cell(70, 10, $pdf->encodeString($rowProducto['descripcion_producto']), 1, 0);
        $pdf->cell(30, 10, $rowProducto['precio_producto'], 1, 0);
        $pdf->cell(30, 10, $estado, 1, 1);
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay productos'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productosordenados.pdf');
