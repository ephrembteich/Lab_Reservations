<?php

    /*** if we are here the data is valid and we can insert it into database ***/

    $lab = intval($_POST['lab']);
    $day = intval($_POST['day']);
    $month = intval($_POST['month']);
    $year = intval($_POST['year']);

//    $day = 20;
//    $month = 12;
//    $year = 2015;

    $days = 0;

    $date = $year.$month.$day;
    $dateTime = strtotime("+".$days." days", strtotime($date));
    $date = date("Y-m-d", $dateTime);

    $dayOfWeek = date("N", mktime(0, 0, 0, $month, $day, $year));
    print_r($dayOfWeek);
    print_r('<br>');
    if ($dayOfWeek != 1){
        $mondayOfWeekTime = strtotime("last Monday", $dateTime);
        $mondayOfWeek = date("Y-m-d", $mondayOfWeekTime);
    }
    else {
        $mondayOfWeek = $date;
    }
//    print("Today is ".$date);
//    print("<br>");
//    print_r($dayOfWeek);
//    print_r("<br>");
//    print("Last monday was ".$mondayOfWeek);
//    print("<br>");
//    print("<br>");

    /*** connect to database ***/
    /*** mysql hostname ***/
    $mysql_hostname = 'localhost';

    /*** mysql username ***/
    $mysql_username = 'root';

    /*** mysql password ***/
    $mysql_password = 'admin';

    /*** database name ***/
    $mysql_dbname = 'lab_reservation';

    /*** table name ***/
    $mysql_table = 'eventcalendar';


    $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);

    /*** set the error mode to excptions ***/
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    /*** check for reservations ***/
    $result = $dbh->query("SELECT Title, Lab, eventDate, eventStart, eventLength, addedBy
                            FROM $mysql_table
                            WHERE eventDate >= '".$mondayOfWeek."'
                            AND eventDate <= date_add('".$mondayOfWeek."', INTERVAL 6 DAY)
                            ORDER BY eventDate ASC");
    $result->execute();
    $result = $result->fetchAll(PDO::FETCH_ASSOC);
//    print_r($result);
//    print_r('<br>');
    foreach ($result as $key => &$value) {
//        print_r($value['eventDate']);
 //       print_r('<br>');
        list($year, $month, $day) = explode('-', $value['eventDate']);
        $dayOfWeek = date("l", mktime(0, 0, 0, $month, $day, $year));

        $value = array('dayOfWeek' => $dayOfWeek)+$value;
        //$value['dayOfWeek'] = $dayOfWeek;
//        print_r($dayOfWeek);

//    print_r('<br>');
    }
 //   print_r($result);

//    print_r("<br>");
//    print_r("<br>");
//    print_r("<br>");
    $result = json_encode($result);
    print_r($result);

    return $result;





/***    if (count($result) > 0) {?>
    <table border="2">
      <thead>
        <tr>
          <th>Title</th>
          <th>Lab</th>
          <th>Date of Reservation</th>
          <th>Time</th>
          <th>Duration</th>
        </tr>
      </thead>
        <?php
          foreach ($result as $key => $value) { ?>
          <tbody>
            <td><?=$value['Title']?></td>
            <td><?=$value['Lab']?></td>
            <td><?=$value['eventDate']?></td>
            <td><?=$value['eventStart']?></td>
            <td><?=$value['eventLength']?></td>
          </tbody>
          <?php }
        ?>

    </table>

    <?php
    }
    else{
        print("No reservations for the week of $date");
    }  ***/
    ?>

