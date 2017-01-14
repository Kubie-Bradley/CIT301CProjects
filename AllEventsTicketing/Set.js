function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = []; // create a resultList array

		if (listA === null || listB === null) { // check for invalid inputs
			return null; //exit and return null to indicate an error
		}

		for (var i = 0; i < listA.length; i++) {
			var nextValue = listA[i]; // get next value in the list

			// for every element in listB
			for (var j = 0; j < listB.length; j++) {
				if (listB[j] === nextValue) { // this listB element equals nextValue
					resultList.push(listB[j]); //add listB element to end of resultList
					break; // break out of (exit) the listB inner loop
				}
			} // end listB inner loop
		} // end listA outer loop
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {
        /*var resultList = []; // create the resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i]; // get next value in the
            var indexInListB = listB.indexOf(nextValue);
            // if indexInListB is gt or equal to 0 that means the current name in listA is also in listB
            if  (indexInListB >= 0) {

            } else {
                resultList.push(listA[i]);
            }


        }*/

        var resultList2 = []; // create the resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listB.length; i++) {
            var nextValue2 = listB[i]; // get next value in the
            var indexInListA = listA.indexOf(nextValue2);
            // if indexInListA is gt or equal to 0 that means the current name in listB is also in listA
            if  (indexInListA >= 0) {

            } else {
                resultList2.push(listB[i]);
            }


        }


        /*var resultList3 = []; // create a resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue3 = listA[i]; // get next value in the list

            // for every element in listB
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue3) { // this listB element equals nextValue
                    resultList3.push(listB[j]); //add listB element to end of resultList
                    break; // break out of (exit) the listB inner loop
                }
            } // end listB inner loop
        } // end listA outer loop*/



	   return listA.concat(resultList2); //.concat(resultList2, resultList);
	}




	this.relativeCompliment = function(listA, listB) {

        var resultList = []; // create the resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i]; // get next value in the
            var indexInListB = listB.indexOf(nextValue);
            // if indexInListB is gt or equal to 0 that means the current name in listA is also in listB
            if  (indexInListB >= 0) {

            } else {
                resultList.push(listA[i]);
			}


        }
       
	   return resultList;
	}



	this.symetricDifference = function(listA, listB) {

        var resultList = []; // create the resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i]; // get next value in the
            var indexInListB = listB.indexOf(nextValue);
            // if indexInListB is gt or equal to 0 that means the current name in listA is also in listB
            if  (indexInListB >= 0) {

            } else {
                resultList.push(listA[i]);
            }


        }

        var resultList2 = []; // create the resultList array

        if (listA === null || listB === null) { // check for invalid inputs
            return null; //exit and return null to indicate an error
        }

        for (var i = 0; i < listB.length; i++) {
            var nextValue2 = listB[i]; // get next value in the
            var indexInListA = listA.indexOf(nextValue2);
            // if indexInListA is gt or equal to 0 that means the current name in listB is also in listA
            if  (indexInListA >= 0) {

            } else {
                resultList2.push(listB[i]);
            }


        }
       
	   return resultList.concat(resultList2);
	}	
	

}
