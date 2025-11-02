const s2 = (p) => {
  let alfa, bravo, charlie;

  p.preload = () => {
    alfa = p.loadTable("assets/drone_alfa_data.csv", "csv", "header");
    bravo = p.loadTable("assets/drone_bravo_data.csv", "csv", "header");
    charlie = p.loadTable("assets/drone_charlie_data.csv", "csv", "header");
  };

  p.setup = () => {
    let canvas2 = p.createCanvas(p.windowWidth * 0.3, 500);
    canvas2.position(p.windowWidth * 0.65 + 20, 100);
    p.background(255);
    p.noFill();
  };

  p.draw = () => {
    p.background(255);

    let graphHeight = p.height / 3;


    drawGraph(alfa, [179, 249, 99], 0);
    drawGraph(bravo, [179, 161, 255], graphHeight);
    drawGraph(charlie, [255, 119, 51], graphHeight * 2);
  };

  function drawGraph(table, col, offsetY) {
    let margin = 40;
    let graphHeight = p.height / 3;

    // range dati
    let allX = table.getColumn("x_vel").map(Number);
    let allY = table.getColumn("y_vel").map(Number);
    let minX = p.min(allX), maxX = p.max(allX);
    let minY = p.min(allY), maxY = p.max(allY);

    p.push();
    p.translate(0, offsetY);

    
    p.fill(255);
    p.noStroke();
    p.rect(0, 0, p.width, graphHeight);

    // Assi 
    p.stroke(0);
    p.strokeWeight(1.5);
    let axisX = graphHeight - margin;
    let axisY = margin;
    p.line(margin, axisX, p.width - margin, axisX); // asse X
    p.line(margin, axisY, margin, axisX); // asse Y

    // Linea del drone (x_vel , y_vel)
    p.noFill();
    p.stroke(...col);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < table.getRowCount(); i++) {
      let x = p.map(table.getNum(i, "x_vel"), minX, maxX, margin, p.width - margin);
      let y = p.map(table.getNum(i, "y_vel"), minY, maxY, axisX, axisY);
      p.vertex(x, y);
    }
    p.endShape();

    p.pop();
  }
};


new p5(s2);
