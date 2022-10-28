# ProvaxMalovatko
Trieda pre JavaScript umoznujuca texturovat viacvrstvove objekty


Priklad pouzitia triedy Malovatko
```

var platno = document.getElementById("platno"); // vyberie DIV objekt kde sa bude kreslit
var malovatko = new Malovatko(platno, 3, 740 / 2, 591 / 2, 0.5); // vytvori nove malovatko na platne, povie rozmery DIVu, layerov (width,height) a nasledne scale, v akom zmensovat original obrazky do neho

malovatko.addBaseImg('img/produkt1/zaklad.png'); // nastavi zakladny
malovatko.addLayer(1, 'img/produkt1/santa_cast_1.png'); // prida template layeru 1
malovatko.addLayer(2, 'img/produkt1/santa_cast_2.png'); // prida template layeru 2
malovatko.addLayer(3, 'img/produkt1/santa_cast_3.png'); // prida template layeru 3

// zatial vidno len zakladny obrazok
malovatko.setLayerTexture(1, 'img/textury/textura107.png'); // pripravi texturu pre layer 1 (pouzijes v selectboxe pri zmene layeru 1 onChange)
malovatko.setLayerTexture(2, 'img/textury/textura109.png'); // pripravi texturu pre layer 2 (pouzijes v selectboxe pri zmene layeru 2 onChange)
malovatko.setLayerTexture(3, 'img/textury/textura111.png'); // pripravi texturu pre layer 3 (pouzijes v selectboxe pri zmene layeru 3 onChange)
// malovatko.render();  // prekresli cely objekt podla aktualne nastavenych textur a layerov
// malovatko.renderLayer(3);  // prekresli iba konkretny layer

```

Zmena textury layeru

```
// Zmena textury layeru
malovatko.setLayerTexture(3,'img/textury/textura110.png'); // pripravi texturu pre layer 3 (pouzijes v selectboxe pri zmene layeru 3 onChange)
// malovatko.render();  // prekresli cely objekt podla aktualne nastavenych textur a layerov
malovatko.renderLayer(3);  // prekresli iba konkretny layer
```