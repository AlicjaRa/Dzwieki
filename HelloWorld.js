    let label = "waiting...";
    let classifier;
    let soundModel = 'https://teachablemachine.withgoogle.com/models/Qjm76nhD0/'
    
    function preload() {
     classifier = ml5.soundClassifier(soundModel + 'model.json');
    }
    
    //na razie nic ciekawego, ładowanie rzeczy

    function setup() {
     createCanvas(1000, 700);
     classifier.classify(gotResult);
     //x i y jako współrzędne kwadratu, którym będziemy poruszać przez wybrane bodżce
     x = 500;
     y = 350;
     //n - ilość spełnionych zadań: ile razy dotarliśmy kwadratem do dużego kwadratu
     n = 0;
     //obrazki, które będą tłem kwadratu
     img1 = loadImage('mouth.png');
     img2 = loadImage('jelly.jpg');
     img3 = loadImage('glass.png');
     img4 = loadImage('1f449.png');
     img5 = loadImage('nothing.png');
    }
    
    function draw() {
        background(0);
        fill(255);
        text(label, width / 2, height - 16);
        //będziemy widzieli, jakie bodźce rozpoznano
        //let emoji = "LB1";
        //nie będę tego używała, ale na wszelki wypadek na przyszłość ukryte
        if (label == "Pstryknięcie palcami") {
            //emoji = "Palce";
            x = x-2
            image(img4, x, y, 50, 50);
        } else if (label == "Głos") {
            //emoji = "Głos";
            y = y-2;
            image(img1, x, y, 50, 50);
        } else if (label == "Szklanka") {
            //emoji = "Szklanka";
            y=y+2
            image(img3, x, y, 50, 50);
        } else if (label == "Galaretka") {
            //emoji = "Galaretka";
            x = x + 2
            image(img2, x, y, 50, 50);
        } else {
            image(img5, x, y, 50, 50);
        }
        //to sprawia, że obiekt przesuwa się wzdłuż osi x lub y, a także zmienia się jego tło
        //text(emoji, width / 2, height / 2);
        noFill();
        rect(x, y, 50, 50);
        fill(40, 200, 350);
        rect(0, 0, 300, 300);
        //kwadraciki, jeden się przesuwa, drugi nie
        fill(200);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('Dotrzyj punktem do niebieskiego kwadratu', 500, 500);
        text('Cel spełniony ' + n + ' razy', 500, 600);
        //instrukcje
        if ((x < 250) && (y < 250)) {
            n = n+1;
            x = 500;
            y = 350;
        }
        //żeby nie było nudno, jak już dotrze się do celu, zaczynamy od nowa, z odniesionym sukcesem
    }
    
    function gotResult(error, results) {
        if (error) {
          console.error(error);
          return;
        }
        label = results[0].label;
    }