app.service('HelperService', function($ionicPopup, $state)
{ 
    this.normalizeAccent = function (array)
    {
      for (i=0;i<array.length;i++)
      {
           array[i].title = array[i].title.replace('ά','α')
                                          .replace('έ','ε')
                                          .replace('ή','η')
                                          .replace('ί','ι')
                                          .replace('ό','ο')
                                          .replace('ύ','υ')
                                          .replace('ώ','ω')
                                          .replace('Ά','Α')
                                          .replace('Έ','Ε')
                                          .replace('Ή','Η')
                                          .replace('Ί','Ι')      
                                          .replace('Ό','Ο')
                                          .replace('Ύ','Υ')                                                                           
                                          .replace('Ώ','Ω');
       }
     return array;
    };
    this.spliceHome = function (array)
    {
      for(i=0;i<array.length;i++)
      {
          if(array[i].alias == 'home' && i>-1)
          {
            //remove the tracked object from the array
            array.splice(i,1);     
            i=-1;
          }

      }
      return array;
    };

this.keepHome = function (array)
    {
      for(i=0;i<array.length;i++)
      {
        if(array[i].alias == 'home')
        {
          //register the object where alias=home to the returning variable
      var home_object=array[i];
        }

    }
    return home_object;
  };

    this.spliceSecondaryMenuitems = function (array)
    {
      for(i=0;i<array.length;i++)
      {
          if(array[i].alias == 'about' || array[i].alias == 'fullwebsite' || array[i].alias == 'facebook' && i>-1)
          {
            //remove the tracked object from the array
            array.splice(i,1);     
            i=-1;
          }

      }
      return array;
    };  

    this.keepSecondaryMenuitems = function (array)
    {
      var secondary_menuitems = [];  
      for(i=0;i<array.length;i++)
      {
        if(array[i].alias == 'about' || array[i].alias == 'fullwebsite' || array[i].alias == 'facebook')
        {
          //push secondary menuitems to the new array
      secondary_menuitems.push(array[i]);
        }

    }
    return secondary_menuitems;
  };    


    this.changeDateFormat = function (array)
    { //for created_at
	    for (i=0;i<array.length;i++)
	    {
	      array[i].created_at = new Date(array[i].created_at);
	      
	      var $day = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή",
		   			   "Σάββατο"][array[i].created_at.getDay()];

	       var $month = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου",
						 "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"][array[i].created_at.getMonth()];
	      																																											//if minutes <10 add a leading zero 
	      array[i].created_at =$day + ', ' +array[i].created_at.getDate() + ' ' +  $month + ' ' + array[i].created_at.getFullYear();

	      array[i].created_at = array[i].created_at.toString(); //convert to broswer's local time
	    }
		return array;
	};	
    this.hasAvatars = function (page_alias)
    {
    	if (page_alias == 'professors' || page_alias == 'secretariat')
    	{
    		return true;
    	}
    	else
    	{
    		return false;
    	}
	};		
    this.sortPeople = function (array)
    {
    	var president = []; var professors = []; var associate_professors = []; var assistant_professors = []; var lecturers = []; var professors_emeriti = []; var secretariat = [];
    	for (i=0;i<array.length;i++)
    	{
    		//split array to 7 different arrays depending on rank, except dividers that will be stored in separate variables
    		switch (array[i].rank) {
			    case 'president':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var president_divider = array[i];} //store in a variable
			    	else{ president.push(array[i]);}//else push it in the separate array
			        break;
			    case 'professors':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var professors_divider = array[i];} //store in a variable
			    	else{ professors.push(array[i]);}//else push it in the separate array
			        break;
			    case 'associate-professors':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var associate_professors_divider = array[i];} //store in a variable
			    	else{ associate_professors.push(array[i]);}//else push it in the separate array
			        break;
			    case 'assistant-professors':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var assistant_professors_divider = array[i];} //store in a variable
			    	else{ assistant_professors.push(array[i]);}//else push it in the separate array
			        break;
			    case 'lecturers':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var lecturers_divider = array[i];} //store in a variable
			    	else{ lecturers.push(array[i]);}//else push it in the separate array
			        break;			        
			    case 'professors-emeriti':
			    	if (array[i].alias == array[i].rank){// if its divider
			    		  var professors_emeriti_divider = array[i];} //store in a variable
			    	else{ professors_emeriti.push(array[i]);}//else push it in the separate array
			    	break;
			    //only for secretariat
			    case 'secretariat':
			    	secretariat.push(array[i]);
			}
		}

    	//alphabetically sort the objects by fullname in the 6 arrays
		function compare(a,b)
		 {
		  if (a.fullname < b.fullname)
		    return -1;
		  if (a.fullname > b.fullname)
		    return 1;
		  return 0;
		}																																													  //only for secretariat
     	president.sort(compare);professors.sort(compare); associate_professors.sort(compare); assistant_professors.sort(compare); lecturers.sort(compare); professors_emeriti.sort(compare); secretariat.sort(compare);
		
		//unshift dividers (push in the beginning of the array)
		president.unshift(president_divider); professors.unshift(professors_divider); associate_professors.unshift(associate_professors_divider); assistant_professors.unshift(assistant_professors_divider); lecturers.unshift(lecturers_divider); professors_emeriti.unshift(professors_emeriti_divider);
    	
    	//merge the 6 arrays back to sorted by rank, only for arrays that contain more than one element (divider)
    	var final_array = [];
    	if (president.length > 1)
    		final_array = final_array.concat(president);
    	if (professors.length > 1)
    		final_array = final_array.concat(professors);
    	if (associate_professors.length > 1)
    		final_array = final_array.concat(associate_professors);
    	if (assistant_professors.length > 1)
    		final_array = final_array.concat(assistant_professors);
    	if (lecturers.length > 1)
    		final_array = final_array.concat(lecturers);
    	if (professors_emeriti.length > 1)
    		final_array = final_array.concat(professors_emeriti);  
    	if (secretariat.length > 0) //only for secretariat
    		final_array = final_array.concat(secretariat);  		    		    		    		    	

    	return final_array;
	};
	
    this.connectionErrorPopup = function ()
    {
      $ionicPopup.show({ //show error popup
          title: "Πρόβλημα Σύνδεσης",
          content: "Αδύνατη η σύνδεση με τον διακομιστή. Παρακαλούμε ελέγξτε τη σύνδεσή σας",
    buttons: [
      { text: 'ΟΚ',
        type: 'button-positive',},
      {
        text: 'Τερματισμός Εφαρμογής',
        type: 'button-positive',
        onTap: function() {
            ionic.Platform.exitApp();
        }
      }
    ]          
      })
    };	

    this.serverErrorPopup = function ()
    {
      $ionicPopup.show({ //show error popup
          title: "Πρόβλημα Σύνδεσης",
          content: "Αδύνατη η σύνδεση με τον διακομιστή. Παρακαλούμε προσπαθήστε αργότερα.",
    buttons: [
      { text: 'ΟΚ',
        type: 'button-positive',},
      {
        text: 'Τερματισμός Εφαρμογής',
        type: 'button-positive',
        onTap: function() {
            ionic.Platform.exitApp();
        }
      }
    ]          
      })
    };	

    this.reconnectPopup = function ()
    {
      $ionicPopup.show({ //show popup
          title: "Συνδεθήκατε",
          content: "Η σύνδεσή σας επανήλθε. Εάν η σελίδα δεν έχει φορτώσει κανονικά, πατήστε 'Επαναφορά στην κεντρική'",
    buttons: [
      { text: 'ΟΚ',
        type: 'button-positive',},
      {
        text: 'Επαναφορά στην κεντρική',
        type: 'button-positive',
        onTap: function() {
			$state.go('app.home');
        }
      }
    ]          
      })
    };	 

        this.pushPopup = function (message)
    {
      $ionicPopup.show({ //show push notification message popup
          title: "Ειδοποίηση: " + message.title,
          content: message.text,
    buttons:
     [
       { text: 'ΟΚ',
          type: 'button-positive',}
     ]          
      })
    };         

});