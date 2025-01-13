document.addEventListener("DOMContentLoaded", function () {
  const shapeSelect = document.getElementById("shape");
  const propertySelect = document.getElementById("property");
  const inputFields = document.getElementById("inputFields");
  const resultDiv = document.getElementById("result");
  const resetBtn = document.getElementById("resetBtn");
  const form = document.getElementById("calcForm");

  const shapeProperties = {
    circle: ["Area", "Circumference"],
    rectangle: ["Area", "Perimeter"],
    square: ["Area", "Perimeter"],
    triangle: ["Area", "Perimeter"],
    cylinder: ["Total Surface Area", "Volume", "Curved Surface Area"],
    trapezium: ["Area", "Perimeter"],
    ellipse: ["Area", "Circumference"],
  };

  const shapeFormFields = {
    circle: [{ name: "radius", label: "Radius" }],
    rectangle: [
      { name: "length", label: "Length" },
      { name: "width", label: "Width" },
    ],
    square: [{ name: "side", label: "Side" }],
    triangle: [
      { name: "base", label: "Base" },
      { name: "height", label: "Height" },
    ],
    cylinder: [
      { name: "radius", label: "Radius" },
      { name: "height", label: "Height" },
    ],
    trapezium: [
      { name: "base1", label: "Base 1" },
      { name: "base2", label: "Base 2" },
      { name: "height", label: "Height" },
    ],
    ellipse: [
      { name: "semiMajor", label: "Semi-Major Axis" },
      { name: "semiMinor", label: "Semi-Minor Axis" },
    ],
  };

  function updateProperties() {
    const selectedShape = shapeSelect.value;
    const properties = shapeProperties[selectedShape];

    propertySelect.innerHTML = "";
    properties.forEach((prop) => {
      const option = document.createElement("option");
      option.value = prop;
      option.textContent = prop;
      propertySelect.appendChild(option);
    });

    updateInputFields();
  }

  function updateInputFields() {
    const selectedShape = shapeSelect.value;
    const fields = shapeFormFields[selectedShape];

    inputFields.innerHTML = "";
    fields.forEach((field) => {
      const div = document.createElement("div");
      div.classList.add("input-field");
      div.innerHTML = `
          <label for="${field.name}">${field.label}:</label>
          <input type="number" id="${field.name}" name="${field.name}" required>
        `;
      inputFields.appendChild(div);
    });
  }

  shapeSelect.addEventListener("change", updateProperties);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const shape = shapeSelect.value;
    const property = propertySelect.value;
    const inputs = new FormData(form);
    const values = {};

    inputs.forEach((value, name) => {
      values[name] = parseFloat(value);
    });

    let result = "";
    let formula = "";

    if (shape === "circle") {
      const radius = values.radius;
      if (property === "Area") {
        result = Math.PI * radius * radius;
        formula = `Area = π × radius²`;
      } else if (property === "Circumference") {
        result = 2 * Math.PI * radius;
        formula = `Circumference = 2 × π × radius`;
      }
    } else if (shape === "rectangle") {
      const { length, width } = values;
      if (property === "Area") {
        result = length * width;
        formula = `Area = length × width`;
      } else if (property === "Perimeter") {
        result = 2 * (length + width);
        formula = `Perimeter = 2 × (length + width)`;
      }
    } else if (shape === "square") {
      const { side } = values;
      if (property === "Area") {
        result = side * side;
        formula = `Area = side²`;
      } else if (property === "Perimeter") {
        result = 4 * side;
        formula = `Perimeter = 4 × side`;
      }
    } else if (shape === "triangle") {
      const { base, height } = values;
      if (property === "Area") {
        result = 0.5 * base * height;
        formula = `Area = 0.5 × base × height`;
      } else if (property === "Perimeter") {
        result = 3 * base;
        formula = `Perimeter = 3 × base`;
      }
    } else if (shape === "cylinder") {
      const { radius, height } = values;
      if (property === "Total Surface Area") {
        result = 2 * Math.PI * radius * (radius + height);
        formula = `Total Surface Area = 2 × π × radius × (radius + height)`;
      } else if (property === "Volume") {
        result = Math.PI * radius * radius * height;
        formula = `Volume = π × radius² × height`;
      } else if (property === "Curved Surface Area") {
        result = 2 * Math.PI * radius * height;
        formula = `Curved Surface Area = 2 × π × radius × height`;
      }
    } else if (shape === "trapezium") {
      const { base1, base2, height } = values;
      if (property === "Area") {
        result = 0.5 * (base1 + base2) * height;
        formula = `Area = 0.5 × (base1 + base2) × height`;
      } else if (property === "Perimeter") {
        result = base1 + base2 + 2 * height;
        formula = `Perimeter = base1 + base2 + 2 × height`;
      }
    } else if (shape === "ellipse") {
      const { semiMajor, semiMinor } = values;
      if (property === "Area") {
        result = Math.PI * semiMajor * semiMinor;
        formula = `Area = π × semiMajor × semiMinor`;
      } else if (property === "Circumference") {
        result =
          Math.PI *
          (3 * (semiMajor + semiMinor) -
            Math.sqrt(
              (3 * semiMajor + semiMinor) * (semiMajor + 3 * semiMinor)
            ));
        formula = `Circumference ≈ π × (3 × (semiMajor + semiMinor) - √((3 × semiMajor + semiMinor) × (semiMajor + 3 × semiMinor)))`;
      }
    }

    resultDiv.innerHTML = `
        <h2>Result:</h2>
        <p><strong>Formula:</strong> ${formula}</p>
        <p><strong>Answer:</strong> ${result.toFixed(2)}</p>
      `;
  });

  resetBtn.addEventListener("click", function () {
    form.reset();
    inputFields.innerHTML = "";
    resultDiv.innerHTML = "";
    updateProperties();
  });

  updateProperties();
});
