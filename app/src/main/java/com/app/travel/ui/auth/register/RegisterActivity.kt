package com.app.travel.ui.auth.register

import android.app.ActivityOptions
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.app.travel.R
import com.app.travel.data.repo.Injection
import com.app.travel.databinding.ActivityRegisterBinding
import com.app.travel.databinding.LayoutRegisterBinding
import com.app.travel.ui.ViewModelFactory
import com.app.travel.ui.auth.login.LoginActivity
import java.util.Locale

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: LayoutRegisterBinding
    private lateinit var selectedCity: String
    private val registerViewModel: RegisterViewModel by viewModels {
        ViewModelFactory(Injection.provideRepository(this))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = LayoutRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        val tvLogin = findViewById<TextView>(R.id.textViewLogin)
        tvLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
        }



        setupView()
        setupObserver()
        setupAction()
    }

    private fun setupView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    private fun setupAction() {
        val spinner: Spinner = findViewById(R.id.spinnerCities)
        ArrayAdapter.createFromResource(
            this,
            R.array.cities_array,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            spinner.adapter = adapter
        }

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                selectedCity = parent.getItemAtPosition(position).toString().toLowerCase(Locale.ROOT)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // Another interface callback
            }
        }

        binding.registerButton.setOnClickListener {
            val username = binding.regisUname.text.toString().trim()
            val email = binding.regisEmail.text.toString().trim()
            val password = binding.regisPass.text.toString().trim()
            val confirmPassword = binding.regisConfirmPass.text.toString().trim()

            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
                Toast.makeText(this, "All fields must be filled", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            registerViewModel.register(username, email, password, confirmPassword, selectedCity)
        }
    }

    private fun setupObserver() {
        registerViewModel.registerResult.observe(this) { message ->
            AlertDialog.Builder(this).apply {
                setTitle("Register Status")
                setMessage(message)
                setPositiveButton("OK") { _, _ ->
                    if (message?.contains("success", true) == true) {
                        finish() // Close Register Activity and return to Login
                    }
                }
                create()
                show()
            }
        }

        registerViewModel.isLoading.observe(this) { isLoading ->
            binding.registerButton.isEnabled = !isLoading
        }
    }
}