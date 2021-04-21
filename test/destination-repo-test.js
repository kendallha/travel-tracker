import chai from 'chai';
const expect = chai.expect;

import Destination from '../src/destination';
import DestinationRepo from '../src/destination-repo';
import destinationData from './destination-test-data';

describe('DestinationRepo', function() {
  let destinations;
  let destinationInfo;
  
  beforeEach(function() {
    destinationInfo = destinationData;
    destinations = new DestinationRepo(destinationInfo.destinations);
  });

  it('should be a function', function() {
    expect(DestinationRepo).to.be.a('function');
  });

  it('should instantiate a new DestinationRepo', function() {
    expect(destinations).to.be.an.instanceOf(DestinationRepo);
  });

  it('should be made up of destination objects', function() {
    expect(destinations.destinations[0]).to.be.an.instanceOf(Destination);
  });

})