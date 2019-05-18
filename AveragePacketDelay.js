var send_table = []; // send_table to store <node_id, seq_no, send_time>

/*save send time function*/
function saveSendTime(element){
  var exists=0;
  var location;
  var i;
  
  for(i=0; i<send_table.length;i++){
    if(send_table[i].node_id == element.node_id){
      location = i;
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

//TestFucntion
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

