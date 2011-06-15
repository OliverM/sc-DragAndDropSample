// ==========================================================================
// Project:   DragAndDrop - mainPage
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals DragAndDrop */

// This page describes the main user interface for your application.  
DragAndDrop.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'sourceView sourceLabelView dropView dropLabelView'.w(),

		sourceView: SC.View.design({
			layout: {top: 0.1, height: 0.3, left: 0.1, width: 0.3},
			backgroundColor: 'red',
			mouseDown: function(evt){
				SC.Drag.start({
					event: evt,
					source: this,
					ghost: NO,
					slideBack: YES
				});
			}
		}),
    
    sourceLabelView: SC.LabelView.design({
      layout: { top: 0.4, left: 0.1, width: 200, height: 18 },
      textAlign: SC.ALIGN_LEFT,
      tagName: "h1", 
      value: "Source"
    }),

		dropView: SC.View.design({
			layout: {top: 0.1, height: 0.3, right: 0.1, width: 0.3},
			backgroundColor: 'blue',
			
			//visual effect showing successful drop
			react: function(){
				this.$().animate({backgroundColor: 'purple'}, 200).animate({backgroundColor: 'blue'}, 200); // would be better using CSS3 once I've deciphered how to hook on to the acceleratedLayer stuff
			},
			
			// SC.DropTarget protocol methods
			isDropTarget: YES,
			dragStarted: function(draggedObj, moveEvent){ //sent to all drop targets in app
				console.log("Drag started. Object: %@ Event: %@".fmt(draggedObj, moveEvent));
			},
			dragEnded: function(dragObj, moveEvent){ //sent to all drop targets in app
				console.log("Drag ended.");				
			},
			
			computeDragOperations: function(dragObj, moveEvent){
				console.log('Returning drag operations accepted.');
				return SC.DRAG_ANY; // any drag operation accepted
			},
			acceptDragOperation: function(dragObj, dragOp){
				return YES;
			},
			
			dragEntered: function(dragObj, moveEvent){
				console.log('Drop target entered.');
			},
			dragUpdated: function(dragObj, moveEvent){
				console.log('Drop target ongoing.');
			},
			dragExited: function(dragObj, moveEvent){
				console.log('Drop target exited.');				
			},
			performDragOperation: function(dragObj, dragOp){
				console.log('Drag operation completed!');
				this.react();
				return dragOp;
			}
			
		}),
		
		dropLabelView: SC.LabelView.design({
      layout: { top: 0.4, right: 0.1, width: 200, height: 18 },
      textAlign: SC.ALIGN_RIGHT,
      tagName: "h1", 
      value: "Destination"
		})
  })

});
