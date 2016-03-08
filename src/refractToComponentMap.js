import PrimitiveComponent from './Primitive/Primitive';
import ArrayComponent from './Array/Array';
import SelectComponent from './Select/Select';
import ObjectComponent from './Object/Object';

export default {
  /**
   * Primitive Types
   */
  boolean: PrimitiveComponent,
  string: PrimitiveComponent,
  number: PrimitiveComponent,

  /**
   * Structure Types
   */
  object: ObjectComponent,
  select: SelectComponent,

  // Since Array and Enum elements have the same structure we'll
  // share the same component for rendering.
  array: ArrayComponent,
  enum: ArrayComponent,
};
