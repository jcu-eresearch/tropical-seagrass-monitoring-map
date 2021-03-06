Updating the resources
======================

To minify Javascript, CSS and produce a suitable HTML file, for reducing
network latency::

    npm install
    grunt

For modification, see all resources in the ``src`` directory.  If developing
this further, you can use::

    grunt watch

Grunt will watch the given resources in the project for changes and recompile
things accordingly.

* Markers and legend imagery: replace the relevant image files in this same
  directory.

* Marker data: modify the Javascript structure inside the ``index.html`` file.
  This map can be copied and re-configured for a different location.

  + Structure must be valid Javascript. All final array elements and
    map keys should not have a trailing ``,`` character.
  + Arbitrary HTML can be inserted into the description field. Take care to
    either replace or espace HTML that includes the wrapping string character.

* Update Javascript resources::

    wget https://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.9/markerwithlabel/src/markerwithlabel_packed.js -O markerwithlabel_packed.js
    grunt


References
==========

* Original map:
  https://mapsengine.google.com/map/embed?mid=zeYkPvVAcWLw.k_UR9bEP75n0
* https://developers.google.com/maps/documentation/javascript/reference
