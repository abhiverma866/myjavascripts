var send_table = [];


function saveTime(element){
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

  console.log(send_table)

}

//TestFucntion
var node_detail;
node_detail = {node_id: 1, seq_no: 1, send_time: 78343534};
console.log(send_table.length);
saveTime(node_detail);
console.log(send_table.length);
node_detail = {node_id: 2, seq_no: 1, send_time: 78343534};
console.log(send_table.length);
saveTime(node_detail);
console.log(send_table.length);
node_detail = {node_id: 2, seq_no: 1, send_time: 7834};
console.log(send_table.length);
saveTime(node_detail);
console.log(send_table.length);
node_detail = {node_id: 3, seq_no: 1, send_time: 783454};
console.log(send_table.length);
saveTime(node_detail);
console.log(send_table.length);







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


// if (element.node_id == 1) {
//   console.log(element.node_id);
// } else {
//   console.log("ID Not present");
// }

// console.log(send_table.length);
// console.log(send_table[1].node_id);

