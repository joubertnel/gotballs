Demo = Em.Application.create({
  balls: [],

  prepare: function() {
    var i;
    var balls = [];
    for (i=0; i < 100; i++) {
      balls.push(new Demo.Ball({ number:i }));
    }

    this.set('balls', balls);
    Demo.BallAreaView.create().appendTo('body');
  },

  animate: function() {
    var theBalls = this.get('balls');      
    var kickass = function() {
      theBalls.invoke('tick');
    }
    setInterval(kickass);
  },
  
  start: function() {
    this.prepare();
    this.animate();
  }
});

Demo.Ball = Em.Object.extend({
  // Properties
  top: 0,
  left: 0,
  content: 0,
  count: 0,
  color: 0,

  style: function() {
    return 'top:%@px; left:%@px; background:rgb(0,0,%@);'.fmt(this.get('top'),
                                                              this.get('left'),
                                                              this.get('color'));
  }.property('top', 'left', 'color'),

  // Methods
  tick: function() {
    var count = this.incrementProperty('count');
    this.set('top', Math.sin(count / 10) * 10);
    this.set('left', Math.cos(count / 10) * 10);
    this.set('color', count % 255);
    this.set('content', count % 100);
  }
});

Demo.BallAreaView = Em.View.extend({
  classNames: ['ball_area'],
  templateName: 'ball_area'
});


Demo.start();
