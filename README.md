# PebblePIM
PebblePIM, Consulting and updating  your PIM on your wrist

![screenshot](http://fabien.benetou.fr/pub/portfolio/PebblePIM.png)

##Principle to update (mood, working)
Send timestamp of memorable moment then 1 minute to update the score of how good or bad it was.
Review then daily or weekly the best moment then complete them with textual description.

###Improvement
* Generalize to other actions rather than only positive/negative feeling
 * e.g. candy
* safety mechanism
 * less than M message of category since X hours, request update
 * more than N messages of category since Y hours, send warning
* Wiki result interface
 * easy to edit last moment
  * can an open on phone option using the middle button
 * top 3 and bottom during last 24 hrs, last 7 days, etc
 
### Ressources
* https://developer.getpebble.com/guides/timeline/timeline-libraries/#pebble-api

## Principle to consult (general information, not working yet)
```javascript

var card = new UI.Card({
  title: 'CE: Side Projects',
  body: 'Cognitive environment: side projects',
  scrollable: true
});
// consider link with  "Open on Phone" actions

lat = 50.84238;
lon = 4.38484;

POS = [ [lon, lat, card], [otherlon, otherlat, othercard], [anotherlon, anotherlat, anothercard], ... ]
distance=1000;
target=POS[0]
if (           abs(pos.coords.longitude-target.longitude)<distance 
        &&  abs(pos.coords.lattitude-target.lattitude)<distance
   ){
               target.card.show();
}
```
### PIM Content
Mini versions (Pebble card format) of PIM CognitiveEnvironments e.g. one for the coffee where I do my morning side projects, one for home, one for the office. Optionally check the time for different messages.


### Problem
How to make it energy efficient, shouldn't check the current position every 2 minutes.

### Resources
* http://developer.getpebble.com/guides/js-apps/js-other/
* http://developer.getpebble.com/docs/pebblejs/
* http://stackoverflow.com/questions/tagged/cloudpebble
* http://fabien.benetou.fr/CognitiveEnvironments/CognitiveEnvironments

