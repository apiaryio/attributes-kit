import ArrayComponent from 'Array/Array';
import ObjectComponent from 'Object/Object';

export default {
  object: ObjectComponent,

  // Since Array and Enum elements have the same structure we'll
  // share the same component for rendering.
  array: ArrayComponent,
  enum: ArrayComponent,
};
