class juego{
    constructor(){
        //Cartas fuera de maso
        this.cartasF = [];
        this.cartasJugador1 = [];
        this.cartasJugador2 = [];
    }

    turnojugador1(params) {
        //Obtener la carta, a partir de la funcion
        //Pasamos como parametro las cartas ya sacadas del maso
        let cartaObtenida = this.obtenerCartaAleatoria(this.cartasF);
        this.cartasJugador1.push(cartaObtenida);
        //Sumamos las cartas del jugados, a traves del metodo
        let sumaCartas = this.sumarCartas(this.cartasJugador1);
        //Mostramos la carta en el DOM y su puntuacion actual
        this.mostrarCarta(cartaObtenida,'1',sumaCartas);
        
        
        if(sumaCartas.valorMasAlto == 21){
            
            juego1.turnojugador2();
        }else if(sumaCartas.valorMasAlto > 21){
            
            juego1.turnojugador2();
        }else if(sumaCartas.valorMasAlto < 21){
           console.log('Turno Jugador1');
        }

    };
    
    turnojugador2(params) {
        //En caso de que sea el turno de jugador 2 se desactiva el puntero
        let btns = [...document.getElementsByClassName('Btn')];  
        btns.forEach(btn=>btn.style.pointerEvents = 'none');
           
        //Oponente
        let cartaObtenida = this.obtenerCartaAleatoria(this.cartasF);
        this.cartasJugador2.push(cartaObtenida);
        let sumaCartas = this.sumarCartas(this.cartasJugador2);        
        this.mostrarCarta(cartaObtenida,'2',sumaCartas);
        
        //Logica
            if(sumaCartas.valorMasAlto == 21){
                //llamamos la funcion de resultado con retraso
                setTimeout(()=>{this.resultado()},2000);
                
            }else if(sumaCartas.valorMasAlto > 21){
                setTimeout(()=>{this.resultado()},2000);
              
            }else if(sumaCartas.valorMasAlto < 21){
                //Si la suma de las cartas no da 21,
                //Comprobamos las cartas del jugador 1
                //Para escoger la opcion
                
                let puntosJ1 = this.sumarCartas(this.cartasJugador1).valorMasAlto;
                let puntosJ2 = this.sumarCartas(this.cartasJugador2).valorMasAlto;
                //Si el puntaje del dos es mayor que el del j1, 
                //Y si es menor a 21, procedemos a terminar
                //En caso contrario agarramos otra carta
                if(puntosJ2 < puntosJ1 && puntosJ1 > 21){
                    setTimeout(()=>{this.resultado()},2000);
                }else if(puntosJ2 > puntosJ1 && puntosJ1 < 21){
                    setTimeout(()=>{this.resultado()},2000);
                    
                }
                //Se busca un empate, si el puntaje es mayor a 19
                else if(puntosJ1 == puntosJ2 && puntosJ2 > 19){
                    setTimeout(()=>{this.resultado()},2000);
                }
                else{
                    setTimeout(()=>{this.turnojugador2()},500);
                    
                }
            
            }                    

        
    };

    resultado(){
        //Funcion para comprobar el ganador
        let puntosJ1 = this.sumarCartas(this.cartasJugador1).valorMasAlto;
        let puntosJ2 = this.sumarCartas(this.cartasJugador2).valorMasAlto;
        
        //Logica
        if(puntosJ1 == puntosJ2){
            alert("Draw");
        }else if(puntosJ1 == 21 && puntosJ2 != 21){
            alert("You win");
        }
        else if(puntosJ1 < 21 && puntosJ1 > puntosJ2){
            alert("You win");
        }
        else if(puntosJ1 < 21 && puntosJ2 > 21){
            alert("You win");
        }
        else if(puntosJ1 > 21 && puntosJ2 > 21 && puntosJ1 < puntosJ2){
            alert("You win");
        }
        else{
            alert("You lose");
        }

        location.reload();
    }

    mostrarCarta(carta,jugador,score){
        //Puntaje
        let cajadepuntos = document.getElementById('score'+jugador);
        cajadepuntos.innerHTML = (score.valor2 != 0) ? score.valor1 + '-' + score.valor2 : score.valor1;
        //Carta
        let cartaIMG = document.createElement('img');
        cartaIMG.setAttribute('src','images/cartas/'+carta+'.png');
        cartaIMG.setAttribute('class','card');
        let box = document.getElementById('box'+jugador);
        box.appendChild(cartaIMG);
        //Buscar, la referencia como imagen
        //Crear un nodo, y adjuntar la carta
        //Anidar el nodo al DOM.
    }

    terminarjuego(){
        window.close();
    }

    obtenerCartaAleatoria(cartasFueradeMaso) {
        //No puede salir la misma carta DOS veces
        //Dos objetos ramdom para las cartas
       //Una para el valor numero
       //Otra para el color
    
        //Valor de la carta
        let valor =  Math.random() * (13 - 1) + 1; //Numero aleatorio entre 1 y 13
        valor = Math.round(valor);
        valor = valor.toString();  

        //Color de la carta
        let simbolo = Math.random() * (4 - 1) + 1; //Numero aleatorio entre 1 y 13
        simbolo = Math.round(simbolo); 
        simbolo = simbolo.toString();       
    
        //Transformar los significados en STRINGS
        switch (valor) {
            case '1':
                valor = 'A';
                break;

            case '11':
                valor = 'J';
                break;

            case '12':
                valor = 'Q';
                break;

            case '13':
                valor = 'K';
                break;
        
            default:
                //-
                break;
        }
//Clover
//Diamond
//Spike
//Heart
        switch (simbolo) {
            case '1':
                simbolo = 'C';
                break;

            case '2':
                simbolo = 'D';
                break;

            case '3':
                simbolo = 'S';
                break;

            case '4':
                simbolo = 'H';
                break;
        
            default:
                //-
                break;
        }
        //Formateamos el string
        let carta = (valor+simbolo).toString();
        //En caso de encontrar una coincidencia, 
        //Volvemos a ejecutar la funcion
        if(cartasFueradeMaso.some(x=> (x == carta))){
            console.log('REPETIDA');
            this.obtenerCartaAleatoria(cartasFueradeMaso);
        }

            cartasFueradeMaso.push(carta);
            return carta;
      }

      sumarCartas(cartasJugador){
          let suma = 0;
          let suma2 = 0;
          //Si hay as, se calculan dos sumas
          //Una cuando vale 11 y otra cuando no
          let contadorA=0;
          cartasJugador.forEach(x => (x[0]=='A') ? contadorA++ : '');
          if(contadorA){
            cartasJugador.forEach(element => {
                let valor;
                //Transformamos el string en entero
                if((element[0]+element[1]).toString() == "10"){
                    valor = (element[0]+element[1]).toString();
                }else{
                    valor = element[0].toString();
                }

                if(valor == 'A'){
                    valor=1;
                }else if(valor == 'Q' || valor == 'J' || valor == 'K'){
                    valor=10;
                }
                valor = parseInt(valor);
                suma += valor;
    
            });
            

            cartasJugador.forEach(element => {
                let valor;
                if((element[0]+element[1]).toString() == "10"){
                    valor = (element[0]+element[1]).toString();
                }else{
                    valor = element[0].toString();
                }
                
                if(valor == 'A'){
                    valor=11;
                }else if(valor == 'Q' || valor == 'J' || valor == 'K'){
                    valor=10;
                }
                valor = parseInt(valor);
                suma2 += valor;
    
            });
            //Hacemos la comprobacion
            return {
                valorMasAlto: (suma2<=21) ? suma2 : suma,
                valor1:suma,
                valor2:suma2
            }
          }else{
            cartasJugador.forEach(element => {
                let valor;
                if((element[0]+element[1]).toString() == "10"){
                    valor = (element[0]+element[1]).toString();
                }else{
                    valor = element[0].toString();
                }
                
                if(valor == 'Q' || valor == 'J' || valor == 'K'){
                    valor=10;
                }
                valor = parseInt(valor);
                suma += valor;
    
            });
            return {
                valorMasAlto: (suma>suma2) ? suma : suma2,
                valor1:suma,
                valor2:suma2
            }
          }
       
      }
    
}

let juego1 = new juego;
juego1.turnojugador1();