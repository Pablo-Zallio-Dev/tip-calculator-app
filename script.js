const d = document;

let $bill = d.querySelector(".calculator__input--bill");
let $person = d.querySelector(".calculator__input--people");
let $btns = d.querySelectorAll(".calculator__btn");
let $inputCustom = d.querySelector(".calculator__btn--custom");
let $inputs = d.querySelectorAll("input");
let $payBtn = d.querySelector(".pay__btn");
let $btnActive;
let $payTotalAmount = d.querySelector(".pay__total--amount");
let $payTotal = d.querySelector(".pay__total--total");

d.addEventListener("click", (e) => {
  if (e.target.matches(".calculator__btn")) {
    //Pintamos los botones
    btnActive(e.target);
  }

  if (e.target.matches(".pay__btn")) {
    location.reload();
  }

  if (e.target.matches(".calculator__btn--active")) {
    $inputCustom.value = "";

    if ($bill.value > 0) {
      if ($person.value > 0) {
        parcentageBtn($bill.value, e.target.textContent, $person.value);
      }
    } else {
      $payTotalAmount.textContent = (0).toFixed(2);
      $payTotal.textContent = (0).toFixed(2);
    }
  }
});

d.addEventListener("input", (e) => {
  if (e.target.matches(".calculator__input--bill")) {
    if ($bill.value > 0) {
      $payBtn.classList.remove("pay__btn--disabled");
      $payBtn.classList.add("pay__btn--active")
      $payBtn.disabled = false;
    } else {
      $payBtn.disabled = true;
      $payBtn.classList.remove("pay__btn--active")

    }

    $payTotal.textContent = e.target.value;

    $btnActive = d.querySelector(".calculator__btn--active") || 0;

    if ($bill.value > 0) {
      if ($btnActive.textContent > 0) {
        if ($person.value > 0) {
          parcentageBtn(e.target.value, $btnActive.textContent, $person.value);
        }
      } else {
        if ($inputCustom.value > 0) {
          parcentageBtn(e.target.value, $inputCustom.value, $person.value);
        } else {
          if ($person.value > 0) {
            $payTotalAmount.textContent = (0).toFixed(2);
            $payTotal.textContent = ($bill.value / $person.value).toFixed(2);
          } else {
            $payTotalAmount.textContent = (0).toFixed(2);
            $payTotal.textContent = $bill.value;
          }
        }
      }
    } else {
      $payBtn.classList.add("pay__btn--disabled");
      $payTotalAmount.textContent = (0).toFixed(2);
      $payTotal.textContent = (0).toFixed(2);
    }
  }

  if (e.target.matches(".calculator__btn--custom")) {
    $btns.forEach((el) => {
      if (el.classList.contains("calculator__btn--active")) {
        el.classList.remove("calculator__btn--active");
      }
    });

    if (e.target.value > 0) {
      if ($bill.value > 0) {
        if ($person.value > 0) {
          parcentageBtn($bill.value, $inputCustom.value, $person.value);
        }
      }
    }
  }

  if (e.target.matches(".calculator__input--people")) {
    $btnActive = d.querySelector(".calculator__btn--active") || 0;

    if ($bill.value > 0) {
      if ($btnActive.textContent > 0) {
        if (e.target.value > 0) {
          parcentageBtn($bill.value, $btnActive.textContent, e.target.value);
          d.querySelector(".calculator__error").style.display = "none";
          d.querySelector(".calculator__input--people").classList.remove(
            "calculator__input--error"
          );
        } else {
          $payTotalAmount.textContent = (0).toFixed(2);
          $payTotal.textContent = (0).toFixed(2);
          d.querySelector(".calculator__error").style.display = "flex";
          d.querySelector(".calculator__input--people").classList.add(
            "calculator__input--error"
          );
        }
      } else {
        if ($inputCustom.value > 0) {
          if (e.target.value > 0) {
            parcentageBtn($bill.value, $inputCustom.value, e.target.value);
            d.querySelector(".calculator__error").style.display = "none";
            d.querySelector(".calculator__input--people").classList.remove(
              "calculator__input--error"
            );
          } else {
            $payTotalAmount.textContent = (0).toFixed(2);
            $payTotal.textContent = (0).toFixed(2);
            console.log("Error");
            d.querySelector(".calculator__error").style.display = "flex";
            d.querySelector(".calculator__input--people").classList.add(
              "calculator__input--error"
            );
          }
        } else {
          if ($person.value > 0) {
            $payTotalAmount.textContent = (0).toFixed(2);
            $payTotal.textContent = ($bill.value / $person.value).toFixed(2);
          } else {
            $payTotalAmount.textContent = (0).toFixed(2);
            $payTotal.textContent = $bill.value;
          }
        }
      }
    }
  }
});

//Pintamos los botones
function btnActive(btn) {
  $btns.forEach((el) => {
    el.classList.remove("calculator__btn--active");
  });
  btn.classList.add("calculator__btn--active");
}

function parcentageBtn(valueBill, parcentageButton, valuePerson) {
  let numBill = parseFloat(valueBill);
  let numParcentage = parseFloat(parcentageButton);
  let numPerson = parseInt(valuePerson);

  let amountParcentage = (numBill * (numParcentage / 100)) / numPerson;

  let totalPay = ((numBill * numParcentage) / 100 + numBill) / numPerson;

  $payTotalAmount.textContent = amountParcentage.toFixed(2);
  $payTotal.textContent = totalPay.toFixed(2);
}
