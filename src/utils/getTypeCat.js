

export function getTypeCat(string){
    // obtener la parte final del path (nombre del archivo)
    const filename = string.split("/").pop();  // "cat_black_cat.png"

    // quitar extensión
    const withoutExt = filename.replace(".png", ""); // "cat_black_cat"

    // dividir por "_"
    const parts = withoutExt.split("_"); // ["cat", "black", "cat"]

    // tomar la palabra deseada (ejemplo: la segunda)
    const word = parts[1]; // "black"

    return word;
}


console.log(getTypeCat("https://res.cloudinary.com/dqc0yku26/image/upload/v1756355495/gatoFeliz/icons/cat_orange_cat.png")); // "black"