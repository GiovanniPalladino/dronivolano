const s1 = (p) => {
  let alfa, bravo, charlie;
  let minX, minY, minZ, maxX, maxY, maxZ;
  let canvas;

  p.preload = () => {
    alfa = p.loadTable("assets/drone_alfa_data.csv", "csv", "header");
    bravo = p.loadTable("assets/drone_bravo_data.csv", "csv", "header");
    charlie = p.loadTable("assets/drone_charlie_data.csv", "csv", "header");
  };

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth * 0.6, 500, p.WEBGL);
    canvas.position(p.windowWidth * 0.035, 100);
    p.strokeWeight(2);
    p.noFill();

    let allX = [], allY = [], allZ = [];
    [alfa, bravo, charlie].forEach(table => {
      allX = allX.concat(table.getColumn("x_pos").map(Number));
      allY = allY.concat(table.getColumn("y_pos").map(Number));
      allZ = allZ.concat(table.getColumn("z_pos").map(Number));
    });
    minX = p.min(allX); maxX = p.max(allX);
    minY = p.min(allY); maxY = p.max(allY);
    minZ = p.min(allZ); maxZ = p.max(allZ);
  };

  p.draw = () => {
    p.background(255);
    let rotY = p.map(p.mouseX, 196, p.width, -p.PI /2, p.PI/8);
    let rotX = p.map(p.mouseY, 15, p.height, -p.PI / 2, p.PI/8);
    p.rotateX(rotX);
    p.rotateY(rotY);

    drawGrid(p, 1000, 50);
    drawAxes(p, 1000);

  
p.stroke(179, 249, 99);    
drawDronePath(p, alfa);
p.stroke(179, 161, 255);     
drawDronePath(p, bravo);
p.stroke(255, 119, 51);   
drawDronePath(p, charlie);

  };

  function drawDronePath(p, table) {
    p.beginShape();
    for (let i = 0; i < table.getRowCount(); i++) {
      let x = p.map(table.getNum(i, "x_pos"), minX, maxX, -p.width / 3, p.width / 3);
      let y = p.map(table.getNum(i, "y_pos"), minY, maxY, p.height / 3, -p.height / 3);
      let z = p.map(table.getNum(i, "z_pos"), minZ, maxZ, -20, 200);
      p.vertex(x, y, z);
    }
    p.endShape();
  }

  function drawAxes(p, len) {
    p.push();
    p.stroke(0);
    p.strokeWeight(1.5);
    p.line(-len, 0, 0, len, 0, 0);
    p.line(0, -len, 0, 0, len, 0);
    p.line(0, 0, -len, 0, 0, len);
    p.pop();
  }

  function drawGrid(p, size, step) {
    p.push();
    p.stroke(0, 30);
    p.strokeWeight(0.8);

    // Griglia 
    for (let x = -size; x <= size; x += step) {
      p.line(x, -size, 0, x, size, 0);
    }
    for (let y = -size; y <= size; y += step) {
      p.line(-size, y, 0, size, y, 0);
    }

    p.pop();
  }
};


new p5(s1);
