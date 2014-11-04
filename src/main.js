/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define, console*/
/*eslint no-console:0 no-use-before-define:0*/

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./css/styles.css');
    require('./index.html');
    //</webpack>

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var LayoutController = require('famous-flex/LayoutController');
    var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');

    // Create overlay
    var text = '';
    text += '<div><h1>PIERRE.PT</h1>';
    text += '<p>Bedankt voor je interesse in Pierre Tromp en PT Sportsolutions.</p>';
    text += '<p>Voor Personal Training, hardlooptrainingen en bootcamptrainingen in en om Maas en Waal kun je contact opnemen via: <a href="http://www.facebook.com/pierre.tromp">facebook/pierre.tromp</a></p>';
    text += '<p>Binnenkort kun je meer informatie verwachten op deze site.</p>';
    text += '<p>Fijne dag verder,<br>Pierre Tromp</p></div>';
    var overlay = new Surface({
        classes: ['overlay'],
        content: text
    });

    // create the main context & layout
    var mainContext = Engine.createContext();
    var lc = new LayoutController({
        layout: function(context, options) {
            var dock = new LayoutDockHelper(context, options);
            var ratio = context.size[0] / context.size[1];
            var renderNode = context.getRenderNode('overlay');
            //console.log('ratio:' + ratio);
            if (ratio > 0.9) {
                dock.left('overlay', context.size[0] / 2, 1);
                if ((context.size[0] / 2) < 350) {
                    renderNode.addClass('small');
                }
                else {
                    renderNode.removeClass('small');
                }
            }
            else {
                var height = Math.max(context.size[1] / 2, 330);
                dock.bottom('overlay', height, 1);
                if (height < 400) {
                    renderNode.addClass('small');
                }
                else {
                    renderNode.removeClass('small');
                }
            }
        },
        dataSource: {
            overlay: overlay
        }
    });
    mainContext.add(lc);
});
