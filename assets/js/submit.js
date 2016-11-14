$(document).ready(function(){

    $("#loanAmount").on("keyup", function(){
        var valid = /^\d{0,30}(\.\d{0,2})?$/.test(this.value),
            val = this.value;

        if(!valid){
            this.value = val.substring(0, val.length - 1);
        }
    });

    $("#propertyValue").on("keyup", function(){
        var valid = /^\d{0,30}(\.\d{0,2})?$/.test(this.value),
            val = this.value;

        if(!valid){
            this.value = val.substring(0, val.length - 1);
        }
    });

    $('#submit').click(function (e){

        e.preventDefault();

        var isValid = true;
        $('#amountErr').empty();
        $('#valueErr').empty();
        $('#ssnErr').empty();
        var currency_1 = document.getElementById("loanAmount").value;
        var currency_2 = document.getElementById("propertyValue").value;
        var ssn = document.getElementById("socialId").value;
        var pattern = /^\d{3}-\d{2}-\d{4}$/;
        var currencyPattern = /^\d+(?:\.\d{0,2})$/;

        if(!currency_1.match(currencyPattern)){
            isValid = false;
            $('#amountErr').html('<p>Please enter a valid loan amount (123.00).</p>').fadeIn('fast');
        }
        if(!currency_2.match(currencyPattern)){
            isValid = false;
            $('#valueErr').html('<p>Please enter a valid property value (123.00).</p>').fadeIn('fast');
        }
        if(!ssn.match(pattern)) {
            isValid = false;
            $('#ssnErr').html('<p>Please enter a valid number format (xxx-xx-xxxx).</p>').fadeIn('fast');
        }

        var formData = $('form').serialize();

        if(isValid)
            submitForm(formData);

    });
});

function submitForm(formData){
    $.ajax({

        type: 'POST',
        url: 'loanPost.php',
        data: formData,
        dataType: 'json',
        cache: false,
        success: function(data){
            if(data.error === true){
                $('.modal-header').html("<h2>Error</h2>");
                $('.modal-body').removeClass().html('<p><strong>' + data.msg + '</strong></p>').fadeIn('fast');
            } else {
                $('.modal-header').html("<h2>Success</h2>");
                $('.modal-body').removeClass().html('<ul><li>Loan ID : ' + data.loanID + '</li><li>Loan Status : ' + data.loanStatus + '</li></ul>').fadeIn('fast');
            }

            $('#your-modal').modal('toggle');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $('.modal-header').html("<h2>Error</h2>");
            $('.modal-body').removeClass().html('<p>There was a <strong>' + errorThrown + '</strong> error due to a <strong>' + textStatus + '</strong> condition.</p>').fadeIn('fast');
            $('#your-modal').modal('toggle');
        },
        complete: function(XMLHttpRequest, textStatus){
            $('form')[0].reset();
        }
    });
}