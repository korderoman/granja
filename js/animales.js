class Animales{
    constructor(estado){
        this.estado=estado;
        this.animalData=[
            {key:"pollo",ancho:131, archivoI:"chicken_spritesheet.png",archivoMp3:"chicken.mp3",archivoOgg:"chicken.ogg",texto:"POLLO",audioKey:"polloS"},
            {key:"cerdo",ancho:297, archivoI:"pig_spritesheet.png",archivoMp3:"pig.mp3",archivoOgg:"pig.ogg",texto:"CERDO",audioKey:"cerdoS"},
            {key:"caballo",ancho:212, archivoI:"horse_spritesheet.png",archivoMp3:"horse.mp3",archivoOgg:"horse.ogg",texto:"CABALLO",audioKey:"caballoS"},
            {key:"oveja",ancho:244, archivoI:"sheep_spritesheet.png",archivoMp3:"sheep.mp3",archivoOgg:"sheep.ogg",texto:"OVEJA",audioKey:"ovejaS"},
        ];
        
        this.rutaI="./recursos/imagenes/";
        this.rutaS="./recursos/audio/";
        this.alto=200;
        this.cFrames=3;
        this.animal;
        this.grupo;
        this.animalActual;
        this.textoAnimal;
       
        
    };

    
  
    
    carga(){
        
        for(var i=0;i<this.animalData.length;i++){
            this.estado.load.spritesheet(this.animalData[i].key,this.rutaI+this.animalData[i].archivoI,this.animalData[i].ancho,this.alto,this.cFrames);
            this.estado.load.audio(this.animalData[i].audioKey,[this.rutaS+this.animalData[i].archivoMp3,this.rutaS+this.animalData[i].archivoOgg]);
        }

    }
        
    mostrar(){
        this.grupo=this.estado.add.group();
        for(var i=0;i<this.animalData.length;i++){
            this.animal=this.grupo.create(-1000,this.estado.world.centerY,this.animalData[i].key,0)
            this.animal.anchor.setTo(0.5);
            this.animal.nombre=this.animalData[i].texto;
            this.animal.animations.add("animar",[0,1,2,1,0,1],3,false);
            //creamos una propiedad personalizada para asociarle un sonido.
            this.animal.sonido=this.estado.add.audio(this.animalData[i].audioKey);
        }
        //mostramos un elemento para ello cogemos un elemento del grupo
        //recordemos que todos los elementos del grupo son sprites
       this.animalActual=this.grupo.getAt(0);
       this.animalActual.position.set(this.estado.world.centerX,this.estado.world.centerY);
       //this.grupo.previous().position.set(this.estado.world.centerX,this.estado.world.centerY);
        this.mostrarTexto(this.animalActual);
    }

    habilitaEntradas(){
        for(var i=0;i<this.grupo.length;i++){
            this.grupo.getAt(i).inputEnabled=true;
            this.grupo.getAt(i).input.pixelPerfectClick=true;
           
        }
    }
    ejecutaAnimacion(){
        for(var i=0;i<this.grupo.length;i++){
           this.grupo.getAt(i).events.onInputDown.add(this.animar,this.estado);
        }
    }

    

    mostrarTexto(animal){
        var estilo={
            font:"bold 30pt Arial",
            fill:"#D0171B",
            align:"center"
        }

        this.textoAnimal=this.estado.add.text(this.estado.world.centerX,this.estado.world.centerY+120,"",estilo);
        this.textoAnimal.anchor.setTo(0.5);
        this.textoAnimal.setText(animal.nombre);
        this.textoAnimal.visible=true;

    };


    //funciones auxiliares
    animar(sprite,evento){
     //   console.log("estoy animado");
        sprite.play("animar");
        sprite.sonido.play();
    }

   
  

    

    







}