var juego= new Phaser.Game(640,360,Phaser.Auto);
var animales;
e={
    preload:function(){
        this.load.image("fondo","./recursos/imagenes/background.png");
        this.load.image("flechas","./recursos/imagenes/arrow.png");
        animales= new Animales(this);
        animales.carga();
    },
    create:function(){
        //el juego se adapte a las dimensiones de la pantalla
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically=true;
        //Incluimos el fondo y las flechas
        this.fondo=this.add.sprite(0,0,"fondo");
        this.flechaI=this.add.sprite(60,this.world.centerY,"flechas");
        this.flechaI.anchor.setTo(0.5);
        this.flechaI.nombre="izquierda";
        this.flechaI.scale.x=-1;
        
        this.flechaD=this.add.sprite(580,this.world.centerY,"flechas");
        this.flechaD.anchor.setTo(0.5);
        
        //incluimos los animales.
        animales.mostrar();

        animales.ejecutaAnimacion();
        //inputs
        this.flechaI.inputEnabled=true;
        this.flechaI.input.pixelPerfectClick=true;
        this.flechaD.inputEnabled=true;
        this.flechaD.nombre="derecha";
        this.flechaD.input.pixelPerfectClick=true;
        animales.habilitaEntradas();
       
        //eventos
        this.flechaI.events.onInputDown.add(this.cambiarAnimal,this);
        this.flechaD.events.onInputDown.add(this.cambiarAnimal,this);
    },
    update:function(){

    },

    //función propia 
    cambiarAnimal:function(sprite,evento){
        //debemos segurarnos que si se está moviendo no podamos presionar el botón
        //y se agolpen todos los animales, por eso usamos onComplete, para que solo 
        //al terminar la animación se pueda pasar otro animal
        if(this.seMueve){
            return false;
        }
        //recordemos que la funcion cambiar animal al ejecutarse y crearse la transicion el nombre del
        //animal debería quedar oculto
        animales.textoAnimal.visible=false;
        this.seMueve=true;

        let nuevoAnimal, endX;
        if(sprite.nombre==="izquierda"){
            nuevoAnimal=animales.grupo.previous();
            nuevoAnimal.x=640+nuevoAnimal.width/2;
            endX=-animales.animalActual.width/2;
        }else{
           nuevoAnimal=animales.grupo.next();
            nuevoAnimal.x=-nuevoAnimal.width/2;
            endX=640+animales.animalActual.width/2;
        }
        //configuramos el movimiento del nuevo animal que va hacia el centro
        let nuevoAnimalMovimiento=this.add.tween(nuevoAnimal);
        nuevoAnimalMovimiento.to({x:this.world.centerX},1000);
        nuevoAnimalMovimiento.onComplete.add(function(){
            this.seMueve=false;
            animales.mostrarTexto(nuevoAnimal);
        },this);
        nuevoAnimalMovimiento.start();
        //ahora desplazamos al antiguo animal
        let animalActualMovimiento=this.add.tween(animales.animalActual);
        animalActualMovimiento.to({x:endX},1000);
        animalActualMovimiento.start();
        //finalmente asignar la nueva posicion

        animales.animalActual=nuevoAnimal;

    }
   
    


}


juego.state.add("Inicio",e);
juego.state.start("Inicio");