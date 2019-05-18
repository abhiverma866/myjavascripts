//try { load("nashorn:mozilla_compat.js"); } catch(e) {}
//importClass(org.contikios.cooja.plugins.ScriptRunner);

TIMEOUT(900000, log.log("Performance Calculation" + "\n"));

packetsReceived= new Array();
packetsSent = new Array();
nodeCount = 31;
senderID = 0;
receiverID = 0;
PDR = 0;
totalLatency = 0;
AE2ED = 0;
seq=0;
st=0;
recv_time=0;
sendTime=0;
entry = {};


var send_table = []; // send_table to store <node_id, seq_no, send_time>
/*save send time function*/
function saveSendTime(element){
    //log.log("Received entry in saveSendTime " + element.node_id + ", " +  element.seq_no + ", " + element.send_time + "\n");
    var exists=0;
    //var location;
    var i;
  
    for(i=0; i<send_table.length;i++){
        if((send_table[i].node_id == element.node_id) && (send_table[i].seq_no == element.seq_no)){
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
    //log.log("Received entry in lookupSendTime " + element.node_id + ", " +  element.seq_no + "\n");
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



for(i = 1; i <= nodeCount; i++){
    packetsReceived[i] = 0;
    packetsSent[i] = 0;
}

/*
Format of serial data for sending and receiving.

01:05.742	ID:29	Sending DATA to 1 'Hello 1' with NodeID= 29
01:05.743	ID:29	Size of data 30
01:05.746	ID:29	Data is Hello 1 from the client abhive
01:05.874	ID:1	Received DATA recv 'Hello 1 from the client abhive' from 29 at NodeID= 1

*/

/*
Formula for calculating packet delay.
i = packet sequence number
count = Total packet count
delay[i] = receiving_time[i] – sending_time[i]
Total_Delay = Total_Delay + delay[i]
Average_Delay = Total_Delay / count
*/
/*
# General Idea For network latency/Average end to end delay: 
when we send the DATA we save node, seqno/packetnr, time to a table 'send'
# when we recv DATA we simply lookup send table and find the sendTime and then computes latency
# and delete that entry from send table, at the end printing send table gives lost packets
*/

while(1){
    YIELD();
    msgArray = msg.split(' ');
    //log.log(msgArray+ "\n");
    //log.log(msgArray[0]+ " " + msgArray[1]);
    //log.log(msgArray.length + "\n");
    if(msgArray.length == 9){
        if(msgArray[0].equals("Sending")){
            
            // sent packet
            senderID = parseInt(msgArray[8]);
            packetsSent[senderID]++;
            //var id = msgArray[8];
            seq = parseInt(msgArray[5]);
            //log.log("seq " + seq + "\n")
            st = Number(time);
            entry = {node_id:senderID, seq_no:seq, send_time:st};
            //log.log("Sending entry to saveSendTime " + entry.node_id + ", " +  entry.seq_no + ","  + entry.send_time + "\n");

            //log.log("enrty.node_id " + entry.node_id + "\n");
            saveSendTime(entry);
            // log.log("On Sending\n");
            // for(j=0; j<send_table.length;j++){
            //     log.log("send_table" + "[" + j + "]" + send_table[j].node_id + " | " +  send_table[j].seq_no + " | "  + send_table[j].send_time + "\n"); 
            //  }            
        }
    }
    if(msgArray.length == 14){
        if(msgArray[0].startsWith("Received")){
            //log.log("On Receiving\n");
            
            //log.log(msgArray.length + "\n");
            senderID = parseInt(msgArray[10]);
            seq = parseInt(msgArray[4]);
            recv_time = Number(time);
            receiverID = parseInt(msgArray[13]);
            packetsReceived[receiverID]++;
            totalReceived = totalSent = 0;
            
            entry = {node_id:senderID, seq_no:seq};
            //log.log("Sending entry send to lookupSendTime " + entry.node_id + ", " +  entry.seq_no + "\n");
            sendTime = lookupSendTime(entry);
            // for(j=0; j<send_table.length;j++){
            //     log.log("send_table" + "[" + j + "]" + send_table[j].node_id + " | " +  send_table[j].seq_no + " | "  + send_table[j].send_time + "\n"); 
            //  }
            if (sendTime > -1){
                //we have a match in sendTable
                totalLatency = totalLatency + (recv_time - sendTime);
            }           
         
            for(i = 1; i <= nodeCount; i++){
                totalReceived += packetsReceived[i];
                totalSent += packetsSent[i];
                //og.log("MoteID= " + i + " ReceivedPackets= " + packetsReceived[i] + " SendingPackets= " + packetsSent[i] + "\n");
            }
            //log.log("totalLatency= " + totalLatency + "\n");
            //log.log("totalCount= " + totalCount + "\n");
            log.log("Generated Packets " + totalSent + "\n");
            log.log("ReceivedPackets " + totalReceived + "\n");
            PDR = (totalReceived / totalSent);
            AE2ED = ((totalLatency / totalReceived)/1000000);
            //log.log("Packet Delivery Ratio " + PDR + "\n");
            //log.log("Average End to End Delay " + AE2ED + "\n");


            log.log("TL = " + totalLatency + " | " + " AE2ED = " + AE2ED + " | " +" PDR = " + PDR + "\n");
        }
    }  
}


