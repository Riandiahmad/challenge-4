class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driver = document.getElementById("tipe-driver");
    this.date = document.getElementById("tanggal");
    this.time = document.getElementById("waktu");
    this.passengger = document.getElementById("penumpang");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
    Car.list.forEach((car) => {
      let waktu = Date.parse(car['availableAt'])
      let dateTime = this.date.value + "T" + this.time.value
      let formDate = Date.parse(dateTime)
      let penumpang = this.passengger.value
      let driver = this.driver.value

      if(driver == 'true'){
        driver = true
      }else{
        driver = false
      }

      if(car.available == driver && waktu >= formDate && car.capacity >= penumpang){
        const node = document.createElement("div");
        node.className = 'col-md-6 col-sm-12 col-lg-3';
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      }
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
