import 'angular';
import 'angular-mocks';
import '../src/abl-payment-summary';

// require all modules ending in ".spec" from the
// current directory and all subdirectories
let testsContext = require.context(".", true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
