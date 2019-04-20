var POP_01	= new Dimensao(750, 560);
var POP_02	= new Dimensao(650, 480);
var POP_03	= new Dimensao(600, 300);

var win;

function Dimensao(largura, altura) {
    this.largura = largura;
	this.altura = altura;
}

function abrirPopupPadrao(url, tamanho) {
    abrirNovaJanela(url, tamanho);
}

function abrirPopupPosicionada(url, tamanho, posicaoX, posicaoY) {
    abrirNovaJanela(url, tamanho, posicaoX, posicaoY);
}

function abrirPopupPadraoExcel(url, tamanho) {
    abrirNovaJanela(url, tamanho, 10, 10, 'yes', null, 'yes');
}

function abrirNovaJanela(url, tamanho, posX, posY, menu, scrollbars, resize) {

    var largura 	= 800;
    var altura      = 600;
    var posicaoX 	= null;
    var posicaoY   	= null;
	var menubar		= 'no';
	var titlebar	= 'no';
    var scroll      = 'yes';
    var resizable	= 'no';
	var nomeJanela  = 'popup' + (new Date().getSeconds()).toString();

    if (tamanho != null) {
	    largura = tamanho.largura;
	    altura = tamanho.altura;
    }
    if (posX != null && posY != null) {
	    posicaoX = posX;
	    posicaoY = posY;
    } else {
	    posicaoX = Math.round((window.screen.availWidth - largura) / 2);
	    posicaoY = Math.round((window.screen.availHeight - altura) / 2);
    }
    if (menu != null) {
	    menubar = menu;
	    titlebar = menu;
    }
    if (scrollbars != null) {
      	scroll = scrollbars;
    }
	if (resize != null) {
      	resizable = resize;
    }
    if (win != null) {
	    win.close();
	}
	
    win = window.open(url, nomeJanela, 
    		"width=" + largura + ", height=" + altura 
    		+ ", left=" + posicaoX + ", top=" + posicaoY 
    		+ ", scrollbars=" + scroll + ", resizable=" + resizable 
    		+ ", menubar=" + menubar + ", titlebar=" + titlebar);
}

function fecharPopup() {
    if (win != null) {
	    win.close();
	}
}

function closewindow() {
	window.close()
}

