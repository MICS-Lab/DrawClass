<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $imageData = $_POST["imageData"];
    $base64Data = str_replace("data:image/png;base64,", "", $imageData);
    
    $imagePath = "drawings/" . time() . ".png";
    
    if (file_put_contents($imagePath, base64_decode($base64Data))) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
