package develop;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import dev.restate.common.Slice;
import dev.restate.sdk.Context;
import dev.restate.sdk.annotation.CustomSerdeFactory;
import dev.restate.sdk.annotation.Handler;
import dev.restate.sdk.annotation.Service;
import dev.restate.serde.Serde;
import dev.restate.serde.jackson.JacksonSerdeFactory;

// <start_custom_jackson>
class MyJacksonSerdeFactory extends JacksonSerdeFactory {
  public MyJacksonSerdeFactory() {
    super(new ObjectMapper().configure(SerializationFeature.INDENT_OUTPUT, true));
  }
}

// <end_custom_jackson>

// <start_custom_jackson_service>
@CustomSerdeFactory(MyJacksonSerdeFactory.class)
@Service
class ServiceWithCustomJacksonObjectMapper {
  @Handler
  public String greet(Context context) {
    return "Hello world";
  }
}

// <end_custom_jackson_service>

public class SerializationExample {
  private void someFn(Context ctx) {
    // <start_use_person_serde>
    ctx.run(new MyPersonSerde(), () -> new Person());
    // <end_use_person_serde>
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
