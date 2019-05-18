var send_table = []; // send_table to store <node_id, seq_no, send_time>
// Working on this file
/*save send time function*/
function saveSendTime(element){
  var exists=0;
  //var location;
  var i;
  
  for(i=0; i<send_table.length;i++){
    if(send_table[i].node_id == element.node_id){
      //location = i;
      exists = 1;
      break;
    }
  }
  if(exists==1){
    send_table[i].send_time = element.send_time;
  }
  else{
    send_table.push(element); 
  }
}

/*Look up function*/
function lookupSendTime(element){
  var i;
  var sendTime;
  for(i=0; i<send_table.length;i++){
    if(send_table[i].node_id == element.node_id){
      if(send_table[i].seq_no == element.seq_no){
        sendTime = send_table[i].send_time;
        send_table.splice(i, 1);
        return sendTime;
      }
    }
  }
  return -1;
}


// function networkLatency(element){
//   var node_detail;
//   node_detail = element;
//   saveSendTime(node_detail);
//   console.log(send_table);
//   console.log("\n");
// }



//calling sub functions form main 
function main(){
  var node_detail;
  node_detail = {node_id: 1, seq_no: 1, send_time: 78343534};
  saveSendTime(node_detail);
  console.log(send_table);
  console.log("\n");
  node_detail = {node_id: 2, seq_no: 1, send_time: 78343534};
  saveSendTime(node_detail);
  console.log(send_table);
  console.log("\n");
  node_detail = {node_id: 2, seq_no: 1, send_time: 7834};
  saveSendTime(node_detail);
  console.log(send_table);
  console.log("\n");
  node_detail = {node_id: 3, seq_no: 1, send_time: 783454};
  saveSendTime(node_detail);
  console.log(send_table);
  console.log("\n");
  node_detail = {node_id:2, seq_no:1, send_time:4545};
  var sendTime;
  sendTime = lookupSendTime(node_detail);
  console.log("sendTime = " + sendTime);
  console.log("\n");
  console.log(send_table);
  console.log("\n");
  
}

main();

//TestFucntion
// sub saveSendTime {
// 		 # save nodenr,packetnr,time
// 		 $nodenr= $_[0]; $packetnr= $_[1]; $time = $_[2];
// 		 if (exists  $send{$nodenr}) {
// 		 	$send{$nodenr}->{$packetnr} = $time; # if the element exists in send hash then add it to the 2nd hash only
// 		 } else {
// 		 	$send{$nodenr}= {$packetnr => $time}; # if the element does not exist in send hash, then add to both hashes 
// 		 }	
// 	}

// 	sub lookupSendTime {
// 		$nodenr= $_[0]; $packetnr= $_[1];  $time = $_[2];
// 		# look
// 		if (exists $send{$nodenr}{$packetnr}) { 
// 			$sendTime = $send{$nodenr}{$packetnr}; # for compute latency
// 			delete($send{$nodenr}{$packetnr}); # if matches then delete, no need to keep it any more
// 			return($sendTime);
// 		}
// 		return(-1);
// 	}

// sub networklatency {
//   # set the output  (result) file name 
//   $resultlog="network_latency.log"; 
//   open ($fh_resultlog,">>",$resultlog) or die $!; # open log file for the result
//   open ($fh_logfile,$logfile) or die $!; # open the log file (from cooja)to be processed for latency

//   # General Idea: when we send the DATA we save node, seqno/packetnr, time to a table 'send'
//     # when we recv DATA we simply lookup send table and find the sendTime and then computes latency
//     # and delete that entry from send table, at the end printing send table gives lost packets
    
//   # 534188412:4:DATA send to 1 'Hello 8'            
//   # 534706491:1:DATA recv from 4 'Hello 8'
//   foreach $line(<$fh_logfile>){ 
//     if ($line =~ m/(\d+):(\d+):DATA send to 1 'Hello (\d+)'/)  { # line can be either sending or receiving
//       $nodenr=$2; $packetnr=$3; $time = $1; # save nodenr,packetnr,time 
//       $noSendPackets = $noSendPackets + 1;  
//       # printf "DATA send line:$line\n";
//       saveSendTime($nodenr, $packetnr, $time ); # save this sending time of each packet to the hash %send
//     } else { # line can be either sending or receiving
//       if ($line=~ m/(\d+):\d+:DATA recv from (\d+) 'Hello (\d+)'/) {
//         $nodenr=$2; $packetnr=$3; $time = $1; # save nodenr,packetnr,time   
//         #printf "DATA recv line:$line\n";
//         # check if send table has a corresponding sendTime, if yes then calculate latency
//         $sendTime = lookupSendTime($nodenr, $packetnr,$time);
//         if ( $sendTime > -1) { # we have a match in sendTable
// #         # printf "latency for node:$nodenr, packet:$packetnr = %d\n", $time - $sendTime;
//           $counter = $counter + 1;
//           $totalLatency = $totalLatency + ($time - $sendTime);
//         }
//       } 
//     }
//   } # end of foreach
  
//   # print loss packets
// # printf "lost packets are:\n";
//   $lostpackets = printLostPackets();
//   printf "NETWORK LATENCY\n";
//   printf "=================\n";
//   $row = sprintf  "Average Latency(us)\tno of SendPackets\tLost Packets\n %-22d %-23d %-15d\n" ,$totalLatency / $counter, $noSendPackets, $lostpackets;
//   printf $row; 
//   $row = sprintf  "%-d,%-d\r\n" ,$totalLatency / $counter, $lostpackets;
//   print $fh_resultlog  $row;  
//   close $fh_resultlog; close $fh_logfile;
//   system("cp","$resultlog","$resultdir");
// }


