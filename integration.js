import supertest from 'supertest';
import chai from 'chai';

const assert = chai.assert;
let request = supertest(`http://localhost:3000`);
let response = {};

describe('Weather API Application', () => {
  it('responds with an expected JSON structure', async () => {
    response = await request.get('/local/80202')
    assert.equal(response.status, 200)
  });

  it('should get an error message if the zip code is less than 5 characters long', async () => {
    response = await request.get(`/local/8022`)    
    assert.equal(response.status, 400);
  });

  it('should get an error message if the zip code does not follow the 5-digit pattern', async () => {
    response = await request.get(`/local/80AB2`)
    assert.equal(response.status, 400);
  });

  it('should get an error message if the user goes to /local', async () => {
    response = await request.get(`/local`)
    assert.equal(response.status, 200);
    assert.equal(response.text, 'To access weather information, please go to /local/{zip code}.  Thank you for visiting.')
  });

  it('should get an error message if the user goes to /', async () => {
    response = await request.get(`/`)
    assert.equal(response.status, 200);
    assert.equal(response.text, 'To access weather information, please go to /local/{zip code}.  Thank you for visiting.')
  });
});
