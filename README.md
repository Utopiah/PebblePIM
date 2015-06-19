# PebblePIM
PebblePIM, Consulting your PIM on your wrist

## Principle
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
## PIM Content
Mini versions (Pebble card format) of PIM CognitiveEnvironments e.g. one for the coffee where I do my morning side projects, one for home, one for the office. Optionally check the time for different messages.


## Problem
How to make it energy efficient, shouldn't check the current position every 2 minutes.

## Resources
http://developer.getpebble.com/guides/js-apps/js-other/
http://developer.getpebble.com/docs/pebblejs/
http://stackoverflow.com/questions/tagged/cloudpebble
http://fabien.benetou.fr/CognitiveEnvironments/CognitiveEnvironments

