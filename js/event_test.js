
EventTest = {
  
  Control: HControl.extend({
    
    drawSubviews:
      function(){
        this.app.event_control = this;
      },
    
    logString:
      function( string ){
        this.app.event_reporter.report( string );
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
        if(other.hoverStartEffect){
          other.hoverStartEffect();
        }
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
        if(other.hoverEndEffect){
          other.hoverEndEffect();
        }
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
  
  GlobalStatus: HView.extend({
    drawSubviews: function(){
      var
      layout = HRect.nu( 0, 0, 150, 24 ),
      BooleanStatusView = HCheckBox.extend({
        onIdle: function(){
          if(this.drawn){
            var status = EVENT.status[ this.options.whichStatus ];
            this.setValue( status );
          }
        }
      });
      NumericStatusView = HStringView.extend({
        drawSubviews: function(){
          this.setStyle('color','#999');
        },
        onIdle: function(){
          if(this.drawn){
            var status = EVENT.status[ this.options.whichStatus ];
            this.setValue( this.label+': '+status );
          }
        }
      });
      ArrayStatusView = NumericStatusView.extend({
        onIdle: function(){
          if(this.drawn){
            var status = EVENT.status[ this.options.whichStatus ];
            this.setValue( this.label+': '+COMM.Values.encode(status) );
          }
        }
      });
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.shiftKeyDown,
          label: 'Shift Key Down'
        }
      );
      layout.offsetBy( 0, 24 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.ctrlKeyDown,
          label: 'Ctrl Key Down'
        }
      );
      layout.offsetBy( 0, 24 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.altKeyDown,
          label: 'Alt Key Down'
        }
      );
      layout.offsetBy( 0, 24 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.metaKeyDown,
          label: 'Meta Key Down'
        }
      );
      layout.offsetBy( 0, 24 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.cmdKeyDown,
          label: 'Cmd Key Down'
        }
      );
      layout.offsetTo( layout.right+8, 0 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.button1,
          label: 'Left Mouse Button'
        }
      );
      layout.offsetBy( 0, 24 );
      BooleanStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.button2,
          label: 'Right Mouse Button'
        }
      );
      layout.offsetBy( 0, 4 );
      layout.offsetBy( 0, 24 );
      NumericStatusView.nu(
        HRect.nu( layout ),
        this, {
          enabled: false,
          value: false,
          whichStatus: EVENT.crsrX,
          label: 'Mouse Cursor X'
        }
      );
      layout.offsetBy( 0, 24 );
      NumericStatusView.nu(
        HRect.nu( layout ),
        this, {
          value: false,
          whichStatus: EVENT.crsrY,
          label: 'Mouse Cursor Y'
        }
      );
      layout.offsetBy( 0, 24 );
      NumericStatusView.nu(
        [ layout.left, layout.top, null, 24, 8, null ],
        this, {
          value: false,
          whichStatus: EVENT.keysDown,
          label: 'Keys Held Down',
          style: [
            ['overflow','hidden'],
            ['white-space','nowrap']
          ]
        }
      );
    }
  }),
  
  Reporter: HControl.extend({
    drawSubviews: function(){
      this.setStyle( 'background', '#f6f6f6' );
      this.setStyle( 'border', '1px solid #ccc' );
      this.setStyle( 'line-height', '16px' );
      this.setStyle( 'font-size', '13px' );
      this.setStyle( 'color', 'black' );
      this.setStyle( 'padding', '4px' );
      this.app.event_reporter = this;
    },
    refreshValue: function(){
      this.setHTML( this.value );
    },
    optimizeSize: function(){
      var
      height = ELEM.getSize( this.elemId )[1],
      lineheight = ELEM.getIntStyle( this.elemId, 'line-height' ),
      padding = ELEM.getIntStyle( this.elemId, 'padding' ),
      limit = -1 + Math.ceil(height/lineheight);
      while (this.options.eventLog.length > limit ){
        this.options.eventLog.shift();
      }
    },
    report: function( string ){
      if(string){
        this.options.eventLog.push( string );
      }
      this.optimizeSize();
      this.setValue( this.options.eventLog.join('<br />') );
    },
    resize: function(){
      this.report();
    }
  }),
  
  Checkbox: HCheckbox.extend({
    refreshValue:
      function(){
        this.base();
        this.app.event_control[this.options.label]( this.value );
      }
  }),
  
  Draggable: HDynControl.extend({
    hoverStartEffect: function(){
      this.setStyle( 'background', '#fc0' );
      this.setStyle( 'color', 'black' );
    },
    hoverEndEffect: function(){
      this.setStyle( 'background', '#03c' );
      this.setStyle( 'color', 'white' );
    },
    drawSubviews: function(){
      this.setStyle( 'background', '#03c' );
      this.setStyle( 'opacity', 0.6 );
      this.setStyle( 'line-height', ELEM.getSize(this.elemId)[1]+'px' );
      this.setStyle( 'font-size', '13px' );
      this.setStyle( 'color', 'white' );
      this.setStyle( 'text-align', 'center' );
      this.setStyle( 'vertical-align', 'middle' );
      this.setHTML( 'Draggable' );
    }
  })
  
};

