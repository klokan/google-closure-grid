goog.provide('pear.ui.DataRow');

goog.require('pear.ui.DataRowRenderer');
goog.require('pear.ui.Row');



/**
 * DataRow
 *
 * @constructor
 * @extends {pear.ui.Row}
 * @param {pear.ui.Grid} grid
 * @param {number} height
 * @param {?goog.ui.Container.Orientation=} opt_orientation Container
 *     orientation; defaults to {@code VERTICAL}.
 * @param {goog.ui.ContainerRenderer=} opt_renderer Renderer used to render or
 *     decorate the container; defaults to {@link goog.ui.ContainerRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 */
pear.ui.DataRow = function(grid,height, opt_orientation, opt_renderer, opt_domHelper) {

  pear.ui.Row.call(this, grid,height, goog.ui.Container.Orientation.HORIZONTAL,
                        pear.ui.DataRowRenderer.getInstance(),
                        opt_domHelper);
};
goog.inherits(pear.ui.DataRow, pear.ui.Row);


/**
 * Grid
 * @type {number}
 * @private
 */
pear.ui.DataRow.prototype.top_ = 0;


/**
  @return {number}
*/
pear.ui.DataRow.prototype.getLocationTop = function() {
  return this.top_;
};


/**
  @param {number} top
*/
pear.ui.DataRow.prototype.setLocationTop = function(top) {
  this.top_ = top;
};


pear.ui.DataRow.prototype.disposeInternal = function() {
  pear.ui.DataRow.superClass_.disposeInternal.call(this);
};

/**
  @override
*/
pear.ui.DataRow.prototype.enterDocument = function() {
  pear.ui.Row.superClass_.enterDocument.call(this);
  var elem = this.getElement();

  this.setPosition_();

  // Handle events dispatched by child controls.
  this.getHandler().
      listen(elem, goog.events.EventType.MOUSEOVER,
          this.handleMouseOver_,false,this).
      listen(elem, goog.events.EventType.MOUSEOUT,
          this.handleMouseOut_,false,this);
};

/**
  @private
  @param {goog.events.BrowserEvent} be
*/
pear.ui.DataRow.prototype.handleMouseOver_ = function(be) {
  var elem = this.getElement();
  goog.dom.classes.add(elem,'pear-grid-row-over');
  if (this.getRowPosition()%2 >0){
    goog.dom.classes.remove(elem,'pear-grid-row-data-odd');
  }
};

/**
  @private
  @param {goog.events.BrowserEvent} be
*/
pear.ui.DataRow.prototype.handleMouseOut_ = function(be) {
  var elem = this.getElement();
  goog.dom.classes.remove(elem,'pear-grid-row-over');
  if (this.getRowPosition()%2 >0){
    goog.dom.classes.add(elem,'pear-grid-row-data-odd');
  }
};


