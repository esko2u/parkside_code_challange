<?php
//    include('include/csv_func.php');
//    sleep(1);

    $servername = "127.0.0.1";
    $username = "root";
    $password = "please1";
    $dbname = "parksidedb";

    $loanAmount = trim($_POST['loanAmount']);
    $properyValue = trim($_POST['propertyValue']);
    $socialId = trim($_POST['socialId']);
    $ltv = $loanAmount/$properyValue;
    $ltv = number_format($ltv, 1, '.', '');
    $error_message = '';


    if($ltv > 0.4){
        $error_message .= "<p>Your LTV is too high at : " . $ltv . "</p>";
    }
    if(empty($loanAmount)){
        $error_message .= "<p>Please provide a loan amount</p>";
    }
    if(empty($properyValue)){
        $error_message .= "<p>Property value is required</p>";
    }
    if(empty($socialId)){
        $error_message .= "<p>Please enter your Social Security Number.</p>";
    }

    if(!empty($error_message)){
        $return['error'] = true;
        $return['msg']  = "<h3>The request was successful but your form is not filled out correctly.</h3>" . $error_message;
        echo json_encode($return);
        exit();
    } else {

        $conn = new mysqli($servername, $username, $password, $dbname);

        $sql = "INSERT INTO loans (loan_amount, property_value, ssn)
VALUES ($loanAmount, $properyValue, $socialId)";

        if ($conn->query($sql) === TRUE) {
            $last_id = $conn->insert_id;
            $gets = false;
        } else {
            $last_id = $conn->insert_id;
            $gets = true;
        }
        $conn->close();

        $return['error'] = false;
        $return['msg'] = "<p>Loan data returned.</p>".$error_message;
        $return['loanID'] = $last_id;
        $return['loanStatus'] = "Accepted";

        echo json_encode($return);
    }

?>