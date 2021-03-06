goog.provide('pear.ui.GridRowRenderer');

goog.require('pear.ui.RowRenderer');



/**
  @constructor
  @extends {pear.ui.RowRenderer}
*/
pear.ui.GridRowRenderer = function() {
  pear.ui.RowRenderer.call(this);
};
goog.inherits(pear.ui.GridRowRenderer, pear.ui.RowRenderer);
goog.addSingletonGetter(pear.ui.GridRowRenderer);


/**
 * Default CSS class to be applied to the root element of containers rendered
 * by this renderer.
 * @type {string}
 */
pear.ui.GridRowRenderer.CSS_CLASS =
    goog.getCssName('pear-grid-row-data');


/**
 * Returns the CSS class to be applied to the root element of containers
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
pear.ui.GridRowRenderer.prototype.getCssClass = function() {
  return pear.ui.GridRowRenderer.CSS_CLASS;
};


/**
 * Returns all CSS class names applicable to the given control,
 * Since all controls have at least one renderer-specific CSS class name, this
 * method is guaranteed to return an array of at least one element.
 * @param {goog.ui.Container} container Control whose CSS classes are to be
 *     returned.
 * @return {Array.<string>} Array of CSS class names applicable to the control.
 * @protected
 */
pear.ui.GridRowRenderer.prototype.getClassNames = function(container) {
  var baseClass = this.getCssClass();

  var isHorizontal =
      container.getOrientation() == goog.ui.Container.Orientation.HORIZONTAL;
  var even = container.getRowPosition() % 2 == 0;
  var classNames = [
    baseClass,
    (isHorizontal ?
        goog.getCssName(baseClass, 'horizontal') :
        goog.getCssName(baseClass, 'vertical'))];
  if (container.isAllowAlternateRowHighlight()) {
    classNames.push(even ? goog.getCssName(baseClass, 'even') :
                        goog.getCssName(baseClass, 'odd'));
  }else {
    // No Alternate Color Highlight
  }

  if (!container.isEnabled()) {
    classNames.push(goog.getCssName(baseClass, 'disabled'));
  }
  return classNames;
};
