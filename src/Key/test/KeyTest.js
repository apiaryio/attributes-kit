import assert from 'assert';
import React from 'react/addons';

describe('Baffo di ferro', () => {
  it('Should be ironed', () => {
    const renderer = React.addons.TestUtils.createRenderer();
    renderer.render(
        <div>
          <span className="heading">Title</span>
        </div>
      );
    const result = renderer.getRenderOutput();
    assert.equal(result.type, 'div');
  });
});
