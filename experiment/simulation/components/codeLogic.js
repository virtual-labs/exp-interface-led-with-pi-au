import {rasberryPiConnectors, rasberryPiPinsMaps} from './componentList.js';

export const codeLogic = (connectedPointSequence) => {

    if(connectedPointSequence.length==0) {
        return {
            "error": "No connection found"
        }
    }

    const requiedConnections = [
      "GPIO",
      "GND",
      "res_1",
    "res_2",
    "path26583",
    "path26585"
    ]

    let count = 0;



    connectedPointSequence.forEach(connections => {
        
        if( requiedConnections.find( e => e == connections.connector)){
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector] == 'GND') {
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector].includes('GPIO')) {
            if(rasberryPiPinsMaps[connections.connector].includes(document.querySelector("#ledPin").value) ) {
            count++;
            return;
            }
        }


    });
    return  (count == 6)
}