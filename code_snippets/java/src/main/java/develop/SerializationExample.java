package develop;

import dev.restate.common.Slice;
import dev.restate.sdk.types.StateKey;
import dev.restate.serde.Serde;
import java.util.Arrays;
import java.util.List;

public class SerializationExample {
  List<Serde> serializers =
      Arrays.asList(
          // <start_here>

          // <end_here>
          );

  // <start_statekey>

  // <end_statekey>

  private void someFn() {

    // <start_protoserdes>
    // <end_protoserdes>

    // <start_pojoserdes>
    // <end_pojoserdes>

    // <start_typerefserdes>
    // <end_typerefserdes>

    // <start_person_state_key>
    StateKey<Person> PERSON_STATE_KEY = StateKey.of("person", new MyPersonSerde());
    // <end_person_state_key>

  }
}

// <start_customserdes>
class MyPersonSerde implements Serde<Person> {
  @Override
  public Slice serialize(Person person) {
    // convert value to a byte array, then wrap in a Slice
    return Slice.wrap(person.toBytes());
  }

  @Override
  public Person deserialize(Slice slice) {
    // convert value to Person
    return Person.fromBytes(slice.toByteArray());
  }
}

// <end_customserdes>

// just to make the rest compile
class Person {
  public static Person fromBytes(byte[] bytes) {
    return new Person();
  }

  public byte[] toBytes() {
    return "".getBytes();
  }
}
