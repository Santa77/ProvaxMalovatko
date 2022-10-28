// Trieda malovatko, ktora vsetko obsluhuje
class Malovatko {
	constructor(platno, layersCnt, width, height, ratio = 1) {
		this.platno = platno;
		this.ratio = ratio;
		this.platno.style.width = width;
		this.platno.style.height = height;
		this.platno.width = width;
		this.platno.height = height;
		this.layersCnt = layersCnt;
		this.layers = [];
		for (let i = 0; i <= this.layersCnt; i++) {
			this.layers[i] = document.createElement('canvas');
			this.layers[i].id = "layer_" + i;
			this.layers[i].width = this.platno.width;
			this.layers[i].height = this.platno.height;
			this.layers[i].className = "malovatkoLayer";
			this.layers[i].style.zIndex = i;
			this.platno.appendChild(this.layers[i]);
		}
		this.layers[0].id = "baseImg";
	}
	addBaseImg(src) {
		this.bgImg = new Image;
		this.bgImg.onload = function() {
			var bgCtx = this.layers[0].getContext("2d");
			bgCtx.drawImage(this.bgImg, 0, 0, this.bgImg.width * this.ratio, this.bgImg.height * this.ratio);
		}.bind(this)
		this.bgImg.src = src;
	}
	addLayer(layer, src) {
		this.layers[layer].tvar = src;
	}
	setLayerTexture(layer, src) {
		this.layers[layer].textura = src;
	}
	render() {
		for (let i = 1; i <= this.layersCnt; i++) {
			this.renderLayer(i);
		}
	}
	renderLayer(layer) {
		var img1 = new Image,
			img2 = new Image,
			cnt = 2;

		img1.onload = img2.onload = function() {
			if (!--cnt) this.go(layer, img1, img2);
		}.bind(this);
		img1.src = this.layers[layer].tvar;
		img2.src = this.layers[layer].textura;

	}
	go(layer, img1, img2) {
		var canvas = document.getElementById("layer_" + layer),
			ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = ctx.createPattern(img2, "repeat");
		ctx.fillRect(0, 0, canvas.width, canvas.height);


		ctx.globalCompositeOperation = "multiply";
		ctx.drawImage(img1, 0, 0, img1.width * this.ratio, img1.height * this.ratio);

		// ctx.globalCompositeOperation = "destination-in";
		ctx.globalCompositeOperation = "destination-atop";
		ctx.drawImage(img1, 0, 0, img1.width * this.ratio, img1.height * this.ratio);
	}
}



// Priklad pouzitia triedy Malovatko

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