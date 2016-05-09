import PrimitiveComponent from './Components/Primitive/Primitive';
import ArrayComponent from './Components/Array/Array';
import SelectComponent from './Components/Select/Select';
import ObjectComponent from './Components/Object/Object';

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
