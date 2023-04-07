function addNewSmartPhone() {
    //lay du lieu
    let producer = document.getElementById("producer").value;
    let model = document.getElementById("model").value;
    let price = document.getElementById("price").value;
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/smartphones",
        success: list
    });
    event.preventDefault();
}

function list() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/smartphones",
        dataType: "json",
        success: function (phone) {
            console.log(phone);
            let phoneHtml = "";
            for (let i = 0; i < phone.length; i++) {
                phoneHtml += '<tr>\n' +
                    '        <td>' + phone[i].producer + '</td>\n' +
                    '        <td>' + phone[i].model + '</td>\n' +
                    '        <td>' + phone[i].price + '</td>\n' +
                    '        <td><button type="submit" onclick="deleteProduct(' + phone[i].id + ')">DELETE</button></td>\n' +
                    '    </tr>';
            }
            document.getElementById("list").innerHTML = phoneHtml;
        }
    })
}

function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/smartphones/" + id,
        dataType: "json",
        success: list
    });
}