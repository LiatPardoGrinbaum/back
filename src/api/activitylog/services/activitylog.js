'use strict';

/**
 * activitylog service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::activitylog.activitylog');
