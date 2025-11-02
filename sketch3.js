const s3 = (p) => {

 p.preload = () => {
    dronecolorato = p.loadImage('assets/dronecolorato.png');
  };

  p.setup = () => {
    let canvas3 = p.createCanvas(
      (p.windowWidth * 0.65 + 20 + p.windowWidth * 0.3) - p.windowWidth * 0.035,
      205
    );
    canvas3.position(p.windowWidth * 0.035, 634);

    p.background(255);
    p.textAlign(p.LEFT, p.CENTER);

    let boxX = 10;
    let boxW = p.windowWidth * 0.6 - 10;
    let boxH = 30;
    let padding = 10;
  
    let colors = [
      { name: "alfa", col: [179, 249, 99] },   
      { name: "bravo", col: [179, 161, 255] },  
      { name: "charlie", col: [255, 119, 51] } 
    ];

    colors.forEach((drone, index) => {
      let boxY = 10 + index * (boxH + 10);

      // Box
      p.noStroke();
      p.textSize(14);
      p.textStyle(p.BOLD);
      p.fill(...drone.col);
      p.rect(boxX, boxY, boxW, boxH);

      // Nome del drone colorato
      p.noStroke();
      p.fill(0);
      p.text(drone.name, boxX + padding, boxY + boxH / 2);
    });

    let box2Y = 10 + colors.length * (boxH + 10) + 10;
    let box2H = 53;

    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.rect(boxX, box2Y, boxW, box2H);

    p.noStroke();
    p.textSize(14);
    p.fill(0);
    p.textAlign(p.LEFT, p.TOP);
    p.textStyle(p.BOLD);
    let textX = boxX + padding;
    let textY = box2Y + padding;
    p.text("a sinistra il grafico della posizione nello spazio tridimensionale dei tre droni", textX, textY);
    p.text("a destra i grafici della velocità lungo asse x e y rispettivamente ascisse e ordinate", textX, textY + 20);

     // imm
    let imgX = boxX + boxW + p.windowWidth * 0.07; 
    let imgY = -180
    let imgW = 290; 
    let imgH = 920; 
    p.image(dronecolorato, imgX, imgY, imgW, imgH);

 p.fill(255, p.random(200,240));
    p.rect(imgX, imgY, 800, 800); 
};

  p.draw = () => {
  };
};

new p5(s3);

