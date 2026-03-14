package com.beko.DemoBank_v1.models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table; // <-- 1. Add this import
import javax.persistence.GeneratedValue; // <-- 2. Add this import
import javax.persistence.GenerationType;
@Entity
@Table(name = "transaction_history")
public class Transact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <-- 5. Auto-increment the ID
    private Integer transaction_id; // <-- 6. Change to Integer
    private Integer account_id;
    private String transaction_type;
    private double amount;
    private String source;
    private String status;
    private String reason_code;

    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public String getTransaction_type() {
        return transaction_type;
    }

    public void setTransaction_type(String transaction_type) {
        this.transaction_type = transaction_type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason_code() {
        return reason_code;
    }

    public void setReason_code(String reason_code) {
        this.reason_code = reason_code;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    private LocalDateTime created_at;


}
