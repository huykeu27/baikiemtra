let walletLocal = window.localStorage.getItem("wallet");
let wallet = walletLocal
  ? JSON.parse(walletLocal)
  : [
      {
        walletName: "Cash",
        list: [
          {
            type: "income",
            money: 200000,
            description: "giai thuong",
            createDate: "2022/05/25",
          },
          {
            type: "expense",
            money: 500000,
            description: "nhau",
            createDate: "2022/05/22",
          },
          {
            type: "expense",
            money: 50000,
            description: "mua nuoc",
            createDate: "2022/05/22",
          },
        ],
      },
      {
        walletName: "vietcombank",
        list: [],
      },
    ];
let vitri;
let del;
render();
function render() {
  document.querySelector(".wallet").innerHTML = " ";
  window.localStorage.setItem("wallet", JSON.stringify(wallet));

  for (let i = 0; i < wallet.length; i++) {
    $(".wallet").append(`
    <div class='wallet${i}' style = 'display:flex;justify-content: space-between;margin-bottom:15px'>
        <p class = 'styleWallet walletname${i}' onclick='viewWallet(${i})'>${wallet[i].walletName}</p>
        <div class='function'>
        <button data-toggle="modal" data-target="#exampleModal" class = "update${i}" onclick="openAddListModal('update-footer')" >Update Wallet</button>
        <button data-toggle="modal" data-target="#exampleModal" class = "title${i}" onclick="openAddListModal('addList-footer')" >Add List</button>
        <button class = 'delete${i}' onclick='deleteWallet(${i})'>Delete</button>
        </div>
    </div>
    `);
    $(`.title${i}`).on("click", function (even) {
      vitri = i;
    });
    $(`.update${i}`).on("click", function (even) {
      vitri = i;
    });
    $(`.delete${i}`).on("click", function () {
      vitri = i;
    });
  }
}

function viewWallet(index) {
  $(".listExpense").html("");
  let listExpense = wallet[index].list;

  let list = listExpense
    .filter((value, i) => {
      return (
        i ===
        listExpense.findIndex((expense) => {
          return expense.createDate === value.createDate;
        })
      );
    })
    .sort((after, befor) => {
      return new Date(befor.createDate) - new Date(after.createDate);
    });

  let [totalIncome, totalExpense] = [0, 0];
  for (let i = 0; i < list.length; i++) {
    let findeDate = list[i].createDate;
    $(".listExpense").append(`
    <div class='expense${i}'>
      <div class='daily'>
        <p class='date'>${new Date(findeDate).toLocaleDateString()}</p>    
        <p class='total${i}'></p> 
      </div>   
    </div>
    `);

    let total = 0;
    for (let j = 0; j < listExpense.length; j++) {
      if (listExpense[j].createDate === findeDate) {
        $(`.expense${i}`).append(`
          <div class='${listExpense[j].type}'>
            <p>${listExpense[j].description}</p>
            <p>${listExpense[j].money}</p>
          </div>
          `);
        if (listExpense[j].type === "income") {
          totalIncome += listExpense[j].money;
          total += listExpense[j].money;
        } else {
          total -= listExpense[j].money;
          totalExpense += listExpense[j].money;
        }
      }
      $(`.total${i}`).html(total.toLocaleString());
    }
  }
  $(".in-money").html(totalIncome.toLocaleString());
  $(".out-money").html(totalExpense.toLocaleString());
  $(".remain").html((totalIncome - totalExpense).toLocaleString());
}
function addWallet() {
  const walletName = document.querySelector(".walletName").value;
  if (walletName) {
    let name = [];
    wallet.forEach((element) => {
      name.push(element.walletName);
    });
    if (name.includes(walletName, 0) !== true) {
      wallet.push({ walletName: walletName, list: [] });
    }
    render();
    document.querySelector(".close").click();
  } else {
    window.alert("Tên ví không được để trống");
  }
}

function addList() {
  const addMoney = document.querySelector(".addMoney").value;
  const typeMoney = document.querySelector(".selectType").value;
  const addDescription = document.querySelector(".addDescription").value;
  const addDate = document.querySelector(".addDate").value;
  if (addMoney && typeMoney && addDescription && addDate) {
    wallet[vitri].list.push({
      type: typeMoney,
      money: addMoney * 1,
      description: addDescription,
      createDate: addDate,
    });
    render();
    document.querySelector(".close").click();
  } else {
    window.alert("Vui lòng điền đầy đủ thông tin");
  }
}
function updateWallet() {
  const newName = document.querySelector(".newName").value;
  if (newName) {
    wallet[vitri].walletName = newName;
    render();
    document.querySelector(".close").click();
  } else {
    window.alert("Vui lòng điền tên ví mới");
  }
}

function openAddListModal(className) {
  let AllFooter = document.querySelectorAll(".modal-footer div");

  for (let i = 0; i < AllFooter.length; i++) {
    AllFooter[i].setAttribute("style", "display:none");
  }
  document
    .querySelector(`.${className}`)
    .setAttribute("style", "display:block");
}

function deleteWallet(vitri) {
  let check = confirm("co chac muon xoa khong");
  if (check) {
    console.log();
    const mangA = wallet.slice(0, vitri);
    const mangB = wallet.slice(vitri + 1, wallet.length);
    const newWallet = mangA.concat(mangB);
    wallet = newWallet;
    render();
  }
}
