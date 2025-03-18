const rubros = {
            "1": { nombre: "Inmobiliarias", variacion: 12 },
            "2": { nombre: "Club deportivo", variacion: 10 },
            "3": { nombre: "Expensas B° privados", variacion: 8 },
            "4": { nombre: "Institución educativa", variacion: 9 }
        };

       
        let historialCalculos = [];

        function ejecutarFuncion() {
            let opcion = document.getElementById("menu").value;
            let div = document.querySelector(".contentCampos");
            let divs = document.getElementsByClassName("boxPrecio");

            if (div) div.style.display = "none";

            for (let i = 0; i < divs.length; i++) {
                divs[i].style.display = "none";
            }

            if (rubros[opcion]) {
                funcion1(rubros[opcion].variacion);
            } else {
                console.log("Opción no válida");
            }
        }

        function funcion1(variacion) {
            let div = document.querySelector(".contentCampos");
            let divs = document.getElementsByClassName("boxPrecio");

            if (div) div.style.display = "block";

            for (let i = 0; i < divs.length; i++) {
                divs[i].style.display = "flex";
            }

            document.getElementById("totalAjustado").setAttribute("data-variacion", variacion);
            calcularTotal();
        }

        function calcularTotal() {
            let canonInput = document.getElementById("precio");
            let clientes = parseInt(document.getElementById("clientes").value.replace(/\D/g, "")) || 0;
            let canon = parseFloat(canonInput.value.replace(/\./g, "").replace(",", ".")) || 0;
            let total = canon * clientes;

            let variacion = parseFloat(document.getElementById("totalAjustado").getAttribute("data-variacion")) || 0;
            let totalAjustado = (total * variacion) / 1000;

            let totalFormateado = total.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            let totalAjustadoFormateado = totalAjustado.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            document.getElementById("totalNormal").textContent = `Total: $${totalFormateado}`;
            document.getElementById("totalAjustado").textContent = `Total ajustado (${variacion}‰): $${totalAjustadoFormateado}`;
            
            historialCalculos.push({ canon, clientes, total, totalAjustado, variacion });
            console.log(historialCalculos);
        }

        function formatearInputCanon(event) {
            let input = event.target;
            let valor = input.value.replace(/[^\d,]/g, "");

            let partes = valor.split(",");
            if (partes.length > 2) {
                valor = partes[0] + "," + partes.slice(1).join("");
            }

            let numero = parseFloat(valor.replace(",", ".")) || 0;
            input.value = numero.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            calcularTotal();
        }