class Product {
  constructor() {
    this.arrayProducts = JSON.parse(localStorage.getItem("products")) || [];
    this.editId = null;
    this.id =
      this.arrayProducts.length > 0
        ? this.arrayProducts[this.arrayProducts.length - 1].id + 1
        : 1;
  }

  save() {
    let product = this.readData();

    if (this.validate(product)) {
      if (this.editId == null) {
        this.toAdd(product);
      } else {
        this.toUpdate(this.editId, product);
      }
    }

    this.tableList();
    this.cancel();
  }

  tableList() {
    let tbody = document.getElementById("tbody");

    if (!this.arrayProducts || this.arrayProducts.length === 0 || !tbody) {
      return;
    }

    tbody.innerHTML = "";

    for (let i = 0; i < this.arrayProducts.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_equipment = tr.insertCell();
      let td_amount = tr.insertCell();
      let td_reserve = tr.insertCell();
      let td_date = tr.insertCell();
      let td_action = tr.insertCell();

      td_id.innerText = this.arrayProducts[i].id;
      td_equipment.innerText = this.arrayProducts[i].nameEquipment;
      td_amount.innerText = this.arrayProducts[i].amount;
      td_reserve.innerText = this.arrayProducts[i].reserve;
      td_date.innerText = this.arrayProducts[i].date;

      td_id.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.src = "img/editar.png";
      imgEdit.setAttribute(
        "onclick",
        "product.toEdit(" + JSON.stringify(this.arrayProducts[i]) + ")"
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "img/bin.png";
      imgDelete.setAttribute(
        "onclick",
        "product.remove(" + this.arrayProducts[i].id + ")"
      );

      td_action.appendChild(imgEdit);
      td_action.appendChild(imgDelete);

      td_action.classList.add("center");
    }
  }

  toAdd(product) {
    this.arrayProducts.push(product);
    localStorage.setItem("products", JSON.stringify(this.arrayProducts));
    this.id++;
  }

  toUpdate(id, product) {
    for (let i = 0; i < this.arrayProducts.length; i++) {
      if (this.arrayProducts[i].id == id) {
        this.arrayProducts[i].nameEquipment = product.nameEquipment;
        this.arrayProducts[i].amount = product.amount;
        this.arrayProducts[i].reserve = product.reserve;
        this.arrayProducts[i].date = product.date;
      }
    }
    localStorage.setItem("products", JSON.stringify(this.arrayProducts));
  }

  //...

  toEdit(data) {
    this.editId = data.id;

    document.getElementById("equipamento").value = data.nameEquipment;
    document.getElementById("quantidade").value = data.amount;
    document.getElementById("reserva").value = data.reserve;
    document.getElementById("data").value = data.date;

    document.getElementById("btn1").innerText = "Atualizar";
  }

  readData() {
    let product = {};

    product.id = this.id;
    product.nameEquipment = document.getElementById("equipamento").value;
    product.amount = document.getElementById("quantidade").value;
    product.reserve = document.getElementById("reserva").value;
    product.date = document.getElementById("data").value;

    return product;
  }

  validate(product) {
    let msg = "";

    if (product.date == "") {
      msg += "- Informe a data da reserva \n";
    }

    if (product.nameEquipment == "") {
      msg += "- Informe o nome do equipamento \n";
    }

    if (product.amount == "") {
      msg += "- Informe a quantidade do equipamento \n";
    }

    if (product.reserve == "") {
      msg += "- Informe a data da reserva \n";
    } else {
      // Verifica se já existe um produto com o mesmo nome de equipamento e data de reserva
      for (let i = 0; i < this.arrayProducts.length; i++) {
        if (
          this.arrayProducts[i].nameEquipment == product.nameEquipment &&
          this.arrayProducts[i].date == product.date &&
          this.editId != this.arrayProducts[i].id
        ) {
          msg += `- Já existe um equipamento reservado com o nome "${product.nameEquipment}" e data ${product.date}.\n`;
          break;
        }
      }
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  cancel() {
    document.getElementById("equipamento").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("reserva").value = "";
    document.getElementById("data").value = "";

    document.getElementById("btn1").innerText = "Salvar";
    this.editId = null;
  }

  remove(id) {
    if (confirm("Deseja realmente deletar o equipamento do ID?" + id)) {
      let tbody = document.getElementById("tbody");

      for (let i = 0; i < this.arrayProducts.length; i++) {
        if (this.arrayProducts[i].id == id) {
          this.arrayProducts.splice(i, 1);
          tbody.deleteRow(i);
        }
      }

      localStorage.setItem("products", JSON.stringify(this.arrayProducts));
    }

    console.log(this.arrayProducts);
  }

  //...
}

var product = new Product();
