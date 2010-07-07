
EventTest = {
  
  Control: HControl.extend({
    
    drawSubviews:
      function(){
        this.app.event_control = this;
      },
    
    logString:
      function( string ){
        console.log( string );
      },
    
    focus:
      function(){
        this.base();
        this.logString('focus');
      },
    
    blur:
      function(){
        this.base();
        this.logString('blur');
      },
    
    gainedActiveStatus:
      function(lastActiveControl){
        this.base(lastActiveControl);
        if(lastActiveControl === null){
          this.logString('gainedActiveStatus');
        }
        else {
          this.logString('gainedActiveStatus: lastViewId='+lastActiveControl.viewId);
        }
      },
    
    lostActiveStatus:
      function(newActiveControl){
        this.base(newActiveControl);
        if(newActiveControl === null){
          this.logString('lostActiveStatus');
        }
        else {
          this.logString('lostActiveStatus: newViewId='+newActiveControl.viewId);
        }
      },
    
    mouseEventLog:
      function(eventName,x,y,button){
        if(button!==null){
          this.logString( eventName+': x='+x+', y='+y+', button='+(button?'left':'right') );
        }
        else if (y===null) {
          this.logString( eventName+': delta='+x );
        }
        else {
          this.logString( eventName+': x='+x+', y='+y );
        }
      },
    mouseDown:
      function(x,y,button){
        this.base(x,y,button);
        this.mouseEventLog( 'mouseDown', x, y, button );
      },
    mouseUp:
      function(x,y,button){
        this.base(x,y,button);
        this.mouseEventLog( 'mouseUp', x, y, button );
      },
    click:
      function(x,y,button){
        this.base(x,y,button);
        this.mouseEventLog( 'click', x, y, button );
      },
    mouseMove:
      function(x,y){
        this.base(x,y);
        this.mouseEventLog( 'mouseMove', x, y, null );
      },
    mouseWheel:
      function(delta){
        this.base(delta);
        this.mouseEventLog( 'mouseWheel', delta, null, null );
      },
    
    startDrag:
      function(x,y,button){
        this.base(x,y,button);
        this.mouseEventLog( 'startDrag', x, y, button );
      },
    drag:
      function(x,y){
        this.base(x,y);
        this.mouseEventLog( 'drag', x, y, null );
      },
    endDrag:
      function(x,y,button){
        this.base(x,y,button);
        this.mouseEventLog( 'endDrag', x, y, button );
      },
    
    startHover:
      function(other){
        this.base(other);
        this.logString( 'startHover: hovered viewId='+ other.viewId );
      },
    drop:
      function(other){
        this.base(other);
        this.logString( 'drop: dropped viewId='+ other.viewId );
      },
    endHover:
      function(other){
        this.base(other);
        this.logString( 'endHover: hovered viewId='+ other.viewId );
      },
    
    keyEventLog:
      function(eventName,keyCode){
        var eventStatus = EVENT.status;
        if ( keyCode === null ) {
          this.logString( eventName );
        }
        else {
          this.logString( eventName+': keyCode='+keyCode );
        }
      },
    textEnter:
      function(){
        this.base();
        this.keyEventLog( 'textEnter', null );
      },
    keyUp:
      function(keyCode){
        this.base(keyCode);
        this.keyEventLog( 'keyUp', keyCode );
      },
    keyDown:
      function(keyCode){
        this.base(keyCode);
        this.keyEventLog( 'keyDown', keyCode );
      }
  }),
  
  EventCheckbox: HCheckbox.extend({
    refreshValue:
      function(){
        this.base();
        this.app.event_control[this.options.label]( this.value );
      }
  }),
  
  Draggable: HDynControl.extend({
    drawSubviews: function(){
      ELEM.setAttr( this.elemId, 'title', 'Drag Me Around' );
      this.setStyle( 'background', '#03c' );
      this.setStyle( 'opacity', 0.6 );
    }
  })
  
};

